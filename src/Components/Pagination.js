import React from 'react'

 const Pagination = ({postPerPage, totalPosts, paginate}) => {
    const pageNumber=[];
    for(let i=1;i<=Math.ceil(totalPosts/postPerPage); i++){
        pageNumber.push(i);
    }
  return (
    
    <nav className='pagination'  >
    {pageNumber.map(number=>(
        <li key={number} className='page-item'>
        <a type="button"   onClick={()=>paginate(number)} className='page-link'>
            {number}
        </a>

        </li>
    ))}
        
    </nav>
    )
}

export default Pagination;
