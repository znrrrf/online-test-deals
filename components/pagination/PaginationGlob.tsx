"use client";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";

interface Props {
  handlePageClick: any;
  pageCount: number;
  currentPage: number;
}

function PaginationGlob(props: Props) {
  const { handlePageClick, pageCount, currentPage } = props;
  const customPageLabelBuilder = (page: number) => {
    return `Page ${page}/${pageCount}`;
  };

  useEffect(() => {
    customPageLabelBuilder(pageCount);
    const coba = customPageLabelBuilder(pageCount);
  }, [pageCount]);
  return (
    <div>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={pageCount || 0}
        forcePage={currentPage}
        previousLabel="<"
        marginPagesDisplayed={0}
        pageRangeDisplayed={0}
        containerClassName=" flex justify-end items-centerw-[500px]"
        pageLinkClassName=" w-[120px] h-10 flex justify-center items-center cursor-default"
        previousLinkClassName=" w-10 h-[40px] flex justify-center items-center text-2xl pb-1 bg-white rounded-lg hover:cursor-pointer"
        nextLinkClassName=" w-10 h-[40px] flex justify-center items-center text-2xl  pb-1 bg-white rounded-lg hover:cursor-pointer"
        activeClassName="w-[120px]"
        pageLabelBuilder={customPageLabelBuilder}
      />
    </div>
  );
}

export default PaginationGlob;
