$(document).ready(function () {
    const dropZone = $('#dropArea');
    const fileInput = $('#fileInput');
    const browseBtn = $('#browseBtn');
    const previewContainer = $('#previewContainer');
    const progressContainer = $('.progress-container');
    const uploadProgress = $('#uploadProgress');
    const progressText = $('#progressText');
    const uploadStatus = $('#uploadStatus');

    let files = [];

    browseBtn.click(() => fileInput.click());

    fileInput.change(e => {
        files = Array.from(e.target.files);
        handleFiles(files);
    });

    dropZone.on('dragover', e => {
        e.preventDefault();
        dropZone.addClass('dragover');
    });

    dropZone.on('dragleave', () => dropZone.removeClass('dragover'));

    dropZone.on('drop', e => {
        e.preventDefault();
        dropZone.removeClass('dragover');
        files = Array.from(e.originalEvent.dataTransfer.files);
        handleFiles(files);
    });

    function handleFiles(selectedFiles) {
        previewContainer.empty();

        selectedFiles.forEach((file, index) => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = e => {
                const previewItem = $(`
              <div class="preview-item">
                <img src="${e.target.result}">
                <div class="remove-btn" data-index="${index}">×</div>
              </div>
            `);

                previewContainer.append(previewItem);

                previewItem.find('.remove-btn').click(function () {
                    const idx = $(this).data('index');
                    files.splice(idx, 1);
                    previewItem.remove();
                });
            };
            reader.readAsDataURL(file);
        });

        if (selectedFiles.length > 0) simulateUpload();
    }

    function simulateUpload() {
        progressContainer.show();
        uploadProgress.css('width', '0%');
        progressText.text('Uploading: 0%');

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            uploadProgress.css('width', progress + '%');
            progressText.text('Uploading: ' + progress + '%');

            if (progress >= 100) {
                clearInterval(interval);
                uploadStatus.text('Upload complete!');
            }
        }, 200);
    }
});