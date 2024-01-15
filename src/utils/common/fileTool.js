export function blobToBase64(blob, callback) {
    const reader = new FileReader();
    reader.onload = function () {
        const base64String = reader.result; //.split(",")[1];
        callback(base64String);
    };
    reader.readAsDataURL(blob);
}
