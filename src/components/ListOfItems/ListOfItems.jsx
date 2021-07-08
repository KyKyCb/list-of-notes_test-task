const ListOfItems = (props)=>{

    return(
        <div className = {'listOfNotes-'+props.className}>
            <ul 
            className ={'listOfNotes-'+props.ulClassName}
            >
                <p>{props.listName}</p>
                {
                    props.children
                }
            </ul>
        </div>
    )
}

export default ListOfItems

