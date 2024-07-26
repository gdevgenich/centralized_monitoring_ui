import Pagination from 'react-bootstrap/Pagination';

const Paging = (props) => {
   if (props.totalPages === 1){
    return (<Pagination/>);
   } else if (props.totalPages < 11) {
    let pages = []
    for ( let i=1; i <= props.totalPages; i++){
        pages.push(<Pagination.Item key={i} active={i===props.currentPage} onClick={() => props.setCurrentPage(i)}>{i}</Pagination.Item>)
    }
    return (
        <Pagination>
            {pages}
        </Pagination>
    );
   }
}

export default Paging;