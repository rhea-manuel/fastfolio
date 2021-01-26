import { SRLWrapper } from "simple-react-lightbox";

export default function (props) {
    console.log(props);

    const bodyFont = document.documentElement.style.getPropertyValue('--body-font');

    const options = {
        buttons: {
            showDownloadButton: false,

        },
        caption: {
            captionFontFamily: bodyFont
        }
    }

    if (!props.gallery){
        return (
            <div>Loading..</div>
        )
    }

    return (
        
        <SRLWrapper options={options}>
            <div className="gallery">
            {
                props.gallery.map((item) => {
                    if (item.fields.Attachments != null) {
                        return (
                            <div>

                            <a href={item.fields.Attachments[0].thumbnails.full.url}>
                                    <img src={item.fields.Attachments[0].thumbnails.large.url} width={400} height={400} alt={item.fields.Caption}></img>
                                </a>
                            </div>
                            )
                        }
                    })
                    
            }
            </div>
        </SRLWrapper>
    )
}