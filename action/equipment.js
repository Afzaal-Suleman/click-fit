$(document).ready(function () {
    function loadAPIData() {
        $.ajax({
            url: 'https://api.restful-api.dev/objects',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayAPIData(data);
            },
            error: function (xhr, status, error) {
                $('#apiData').html(`
                    <div class="col-12 text-center">
                        <div class="alert alert-warning">
                            <h5>Error loading data</h5>
                            <p>Could not fetch data from the API. Please try again later.</p>
                            <p><em>Error: ${error}</em></p>
                        </div>
                    </div>
                `);
            }
        });
    }

    function displayAPIData(data) {
        let html = '';

        const itemsToShow = data.slice(0, 6);

        itemsToShow.forEach(item => {
            html += `
                <div class="col-md-4 mb-4">
                    <div class="api-card">
                        <h5>${item.name}</h5>
                        ${item.data ? `
                            <p><strong>ID:</strong> ${item.id}</p>
                            ${item.data.color ? `<p><strong>Color:</strong> ${item.data.color}</p>` : ''}
                            ${item.data.capacity ? `<p><strong>Capacity:</strong> ${item.data.capacity}</p>` : ''}
                            ${item.data.price ? `<p><strong>Price:</strong> $${item.data.price}</p>` : ''}
                            ${item.data.generation ? `<p><strong>Generation:</strong> ${item.data.generation}</p>` : ''}
                        ` : `<p><strong>ID:</strong> ${item.id}</p>`}
                        <span class="badge">API Item</span>
                    </div>
                </div>
            `;
        });

        $('#apiData').html(html);      
    }

    loadAPIData();
})