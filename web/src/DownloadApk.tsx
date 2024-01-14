import './components/Button.css';

/**
 * 
 * @returns {JSX.Element} the page used to download the apk
 */
const DownloadApk = (): JSX.Element => {
    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h2 className='title'>Download the Area application</h2>
            <a className='button border black-button' href={"/shared/app-release.apk"} download>Download</a>
        </section>
    );
}

export default DownloadApk;