import { Download } from "@mui/icons-material";
import { File } from "buffer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DownloadApk = (): JSX.Element => {
    const file = new File(".babelrc")
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <a href={URL.createObjectURL(".babelrc")} download>Download</a>
        </div>
    );
}

export default DownloadApk;