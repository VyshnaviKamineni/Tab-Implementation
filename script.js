$(document).ready(function () {
    let tabCounter = 1;
    let activeTabID = ''; // Track the active tab ID

    // Function to add a new tab
    function addTab() {
        const tabID = 'tab-' + tabCounter;
        const tabTitle = prompt('Enter tab title:') || `Tab ${tabCounter}`;
        const newTab = `<div class="tab" id="${tabID}">${tabTitle}<button class="close-tab" data-tab-id="${tabID}">x</button></div>`;
        $('#tabs-container').append(newTab);

        const newContent = `<div class="content" id="content-${tabID}">
                               <div class="tab-content">
                                  <input type="text" class="url-input" placeholder="Enter URL and press Enter">
                                  <iframe class="content-iframe" src=""></iframe>
                                </div>
                            </div>`
                            
        $('#content-container').append(newContent);

        // Set event listener for tab click
        $(`#tabs-container #${tabID}`).click(function () {
            switchTab(tabID);
        });

        // Set event listener for URL input
        $(`#content-${tabID} input.url-input`).on('keydown', function (event) {
            if (event.key === 'Enter') {
                const url = $(this).val();
                loadURL(tabID, url);
            }
        });
        
        tabCounter++;
        switchTab(tabID); // Activate the newly added tab
    }

    // Function to switch to a tab
    function switchTab(tabID) {
        if (activeTabID !== tabID) {
            // Hide the currently active content of previous tab
            if (activeTabID !== '') {
                $(`#content-${activeTabID}`).hide();
            }

            // Show the content of the selected tab
            $(`#content-${tabID}`).show();

            // Update the active tab with newly selected tab
            activeTabID = tabID;
        }
    }

    // Function to load a URL in the iframe
    function loadURL(tabID, url) {
        $(`#content-${tabID} iframe.content-iframe`).attr('src', url);
    }

    // Function to remove a tab
    function removeTab(tabID) {
        $('#' + tabID).remove();
        $(`#content-${tabID}`).remove();
    }

    // Event listener for the "+" button to add a new tab
    $('#add-tab').click(function () {
        addTab();
    });

    // Event delegation for dynamically created close buttons
    $('#tabs-container').on('click', '.close-tab', function () {
        const tabID = $(this).data('tab-id');
        removeTab(tabID);
    });
});
