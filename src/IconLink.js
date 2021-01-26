export default function IconLink(props){
    return (
        <a href={props.url}><i className={props.icon}></i> {props.urlName}</a>
    )
}