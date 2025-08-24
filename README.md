# HTML File Upload App

This project is a simple web application that allows users to upload files, convert them into JSON data, and interact with a COM2 interface. Below are the details for setting up and using the application.

## Project Structure

```
html-file-upload-app
├── src
│   ├── index.html        # Main HTML page
│   ├── styles
│   │   └── style.css     # Styles for the HTML page
│   ├── scripts
│   │   └── main.js       # JavaScript for handling file uploads and interactions
│   └── assets            # Directory for any additional assets
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd html-file-upload-app
   ```

2. **Open the project**:
   Open the `src/index.html` file in your web browser to view the application.

3. **File Upload**:
   Use the file upload button to select files from your local machine. The application will read the files and convert them into JSON format.

4. **Download Option**:
   After uploading, you will have the option to download the converted JSON data.

5. **COM2 Interaction**:
   Click the button to send the data to COM2. The response will be displayed in the designated field.

## Usage

- Upload files using the provided button.
- View the converted JSON data and download it if needed.
- Send data to COM2 and check the response in the application.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.