const goToPrevPage = () => {
    flipBook.current.pageFlip().flipPrev();
  };

  const goToNextPage = () => {
    flipBook.current.pageFlip().flipNext();
  };

  const goToFirstPage = () => {
    flipBook.current.pageFlip().flip(0);
  };

  const goToLastPage = () => {
    flipBook.current.pageFlip().flip(totalPages);
  };