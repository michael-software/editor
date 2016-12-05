(function(fileLoader) {
    var _fileLoader = null;
    var _callback = null;
    var _callbackError = null;

    fileLoader.show = function(callback, callbackError) {
        if(!_fileLoader) {
            init();
        }

        _callback = (null || callback);
        _callbackError = (null || callbackError);

        _fileLoader.click();
    };

    function init() {
        _fileLoader = document.createElement('input');
        _fileLoader.style.display = 'none';
        _fileLoader.type = 'file';
        _fileLoader.addEventListener('change', fileChanged, false);
        document.body.appendChild(_fileLoader);
    }

    function fileChanged(event) {
        if(_fileLoader.files && _fileLoader.files.length > 0) {
            var file = _fileLoader.files[0];

            if(!file.type.match('text.*')) {
                return;
            }

            var reader = new FileReader();

            reader.onload = function (event) {
                if(_callback) _callback(event.target.result, file.type);
            };

            reader.onerror = function (event) {
                if(_callbackError) _callbackError(event);
            };

            reader.readAsText(file, "UTF-8");
        }
    }
})(window.fileLoader = {});