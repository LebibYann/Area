import { Download } from "@mui/icons-material";
import { File } from "buffer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DownloadApk = (): JSX.Element => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <a href={"/app-release.apk"} download>Download</a>
        </div>
    );
}

export default DownloadApk;