import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from 'react-table';

// Export Modal
import ExportCSVModal from '@Components/Common/ExportCSVModal';

import { Table, Row, Col, Button, Input, CardBody } from 'reactstrap';
import { DefaultColumnFilter } from './filters';
import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
} from '../../Components/Common/GlobalSearchFilter';

const TableContainer = ({
  columns,
  data,
  isGlobalSearch,
  isGlobalFilter,
  isProductsFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isLeadsFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  addRowBtn,
  exportData,
  trHeaderClass,
  cellClass,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      // initialState: {
      //   pageIndex: 0,
      //   pageSize: customPageSize,
      //   selectedRowIds: 0,
      //   sortBy: [
      //     {
      //       desc: true,
      //     },
      //   ],
      // },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // Define a default UI for filtering
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    isCustomerFilter,
    isOrderFilter,
    isContactsFilter,
    isCompaniesFilter,
    isCryptoOrdersFilter,
    isInvoiceListFilter,
    isTicketsListFilter,
    isNFTRankingFilter,
    isTaskListFilter,
    isProductsFilter,
    isLeadsFilter,
    SearchPlaceholder,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    // Export Modal
    const [isExportCSV, setIsExportCSV] = useState(false);

    return (
      <React.Fragment>
        {/* <CardBody className='border border-dashed border-end-0 border-start-0'> */}
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={data}
        />
        <CardBody className=''>
          <form>
            <Row className='g-3'>
              <Col>
                {addRowBtn && (
                  <button
                    type='button'
                    className='btn btn-primary btn-label waves-effect waves-light me-2'
                    onClick={() => {
                      addRowBtn.callBack();
                    }}
                  >
                    <i className='ri-add-line label-icon align-middle fs-16 me-2'></i>{' '}
                    {addRowBtn.label}
                  </button>
                )}
              </Col>
              <Col>
                <div
                  className={
                    isProductsFilter ||
                    isContactsFilter ||
                    isCompaniesFilter ||
                    isLeadsFilter ||
                    isNFTRankingFilter
                      ? 'search-box me-2 mb-2 d-inline-block'
                      : 'search-box me-2 mb-2 d-inline-block col-12'
                  }
                >
                  <input
                    onChange={(e) => {
                      setValue(e.target.value);
                      onChange(e.target.value);
                    }}
                    id='search-bar-0'
                    type='text'
                    className='form-control search /'
                    placeholder={SearchPlaceholder}
                    value={value || ''}
                  />
                  <i className='bx bx-search-alt search-icon'></i>
                </div>
              </Col>
              {isProductsFilter && <ProductsGlobalFilter />}
              {isCustomerFilter && <CustomersGlobalFilter />}
              {isOrderFilter && <OrderGlobalFilter />}
              {isContactsFilter && <ContactsGlobalFilter />}
              {isCompaniesFilter && <CompaniesGlobalFilter />}
              {isLeadsFilter && <LeadsGlobalFilter />}
              {isCryptoOrdersFilter && <CryptoOrdersGlobalFilter />}
              {isInvoiceListFilter && <InvoiceListGlobalSearch />}
              {isTicketsListFilter && <TicketsListGlobalFilter />}
              {isNFTRankingFilter && <NFTRankingGlobalFilter />}
              {isTaskListFilter && <TaskListGlobalFilter />}
              {exportData && (
                <Col className='col-md-auto ms-auto'>
                  <button
                    className='btn btn-soft-success'
                    onClick={(e) => {
                      e.preventDefault();
                      setIsExportCSV(true);
                    }}
                  >
                    Export
                  </button>
                </Col>
              )}
            </Row>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' ' : '') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };
  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Row className='mb-3'>
        {isGlobalSearch && (
          <Col md={1}>
            <select
              className='form-select'
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isProductsFilter={isProductsFilter}
            isCustomerFilter={isCustomerFilter}
            isOrderFilter={isOrderFilter}
            isContactsFilter={isContactsFilter}
            isCompaniesFilter={isCompaniesFilter}
            isLeadsFilter={isLeadsFilter}
            isCryptoOrdersFilter={isCryptoOrdersFilter}
            isInvoiceListFilter={isInvoiceListFilter}
            isTicketsListFilter={isTicketsListFilter}
            isNFTRankingFilter={isNFTRankingFilter}
            isTaskListFilter={isTaskListFilter}
            SearchPlaceholder={SearchPlaceholder}
          />
        )}
        {isAddOptions && (
          <Col sm='7'>
            <div className='text-sm-end'>
              <Button
                type='button'
                color='success'
                className='btn-rounded  mb-2 me-2'
                onClick={handleOrderClicks}
              >
                <i className='mdi mdi-plus me-1' />
                Add New Order
              </Button>
            </div>
          </Col>
        )}

        {isAddUserList && (
          <Col sm='7'>
            <div className='text-sm-end'>
              <Button
                type='button'
                color='primary'
                className='btn mb-2 me-2'
                onClick={handleUserClick}
              >
                <i className='mdi mdi-plus-circle-outline me-1' />
                Create New User
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={`${theadClass}`}>
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
                className={trHeaderClass}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={thClass}
                    {...column.getSortByToggleProps()}
                  >
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr
                    className={trClass}
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          {...cell.getCellProps()}
                          className={`${cellClass}`}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <div className='pagination-wrap hstack gap-2 d-flex'>
          <div>
            {' '}
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <button
            className='page-item pagination-prev '
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <ul className='pagination listjs-pagination mb-0'>
            {/* <li className="active">
              <a className="page" href="#" data-i="1" data-page="8">
                 {pageIndex + 1} 
              </a>
            </li> */}
            <Input
              type='number'
              className='page-item pagination-prev  text-center'
              min={1}
              // style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </ul>
          <button
            className='page-item pagination-next'
            onClick={nextPage}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
