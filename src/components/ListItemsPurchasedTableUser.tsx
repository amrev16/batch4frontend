import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getLoanedItemsByEmployee } from '../services/http.services';
import { ILoanedItems } from '../types/IloanedItems';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ListItemsPurchasedTableUser() : React.JSX.Element {
  const [loanedItems, setLoanedItems] = React.useState<ILoanedItems[]>();
  React.useEffect(()=>{
    getLoanedItemsByEmployee().then(res=>setLoanedItems(res));
  }, [])  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Issue ID</StyledTableCell>
            <StyledTableCell>Item ID</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Make</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Valuation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loanedItems?.map((item) => (
            <StyledTableRow key={item.issueId}>
              <StyledTableCell component="th" scope="row">
                <Typography color='gray' fontWeight={'bold'} onClick={()=>navigator.clipboard.writeText(item.issueId)} >{item.issueId.substring(0, 8)}</Typography>
              </StyledTableCell>
              <StyledTableCell  >
                <Typography color='gray' fontWeight={'bold'}>{item.id.substring(0, 8)}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">{item.itemDescription}</StyledTableCell>
              <StyledTableCell align="right">{item.itemMake}</StyledTableCell>
              <StyledTableCell align="right">{item.itemCategory}</StyledTableCell>
              <StyledTableCell align="right">{item.itemValuation}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}