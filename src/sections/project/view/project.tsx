import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { TableEmptyRows } from '../table-empty-rows';
import { ProjectTableRow } from '../project-table-row';
import { ProjectTableHead } from '../project-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';

interface Project {
  id: string;
  name: string;
  logo: string; // Ensure this is present
  status: string;
  manager: string;
  avatarUrl: string;
  isCompleted: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'MUNT Masters',
    logo: 'logo1.png',
    status: 'Active',
    manager: 'John Doe',
    avatarUrl: 'avatar1.png',
    isCompleted: false,
  },
  {
    id: '2',
    name: 'Holthaus',
    logo: 'logo2.png',
    status: 'Pending',
    manager: 'Jane Smith',
    avatarUrl: 'avatar2.png',
    isCompleted: false,
  },
  {
    id: '3',
    name: 'Project Three',
    logo: 'logo3.png',
    status: 'Completed',
    manager: 'Alice Johnson',
    avatarUrl: 'avatar3.png',
    isCompleted: true,
  },
];

export function ProjectView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');

  const dataFiltered: Project[] = applyFilter({
    inputData: projects,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Box>
      <Box>
        <Typography variant="h4" flexGrow={1}>
          Projects
        </Typography>
        <Button variant="contained" color="inherit">
          New Project
        </Button>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProjectTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={projects.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    projects.map((project) => project.id)
                  )
                }
                headLabel={[
                  { id: 'logo', label: 'Logo' },
                  { id: 'name', label: 'Name' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((project) => (
                    <ProjectTableRow
                      key={project.id}
                      project={project}
                      selected={table.selected.includes(project.id)}
                      onSelectRow={() => table.onSelectRow(project.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, projects.length)}
                />
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={projects.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<keyof Project>('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: keyof Project) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (id: string) => {
      const newSelected = selected.includes(id)
        ? selected.filter((value) => value !== id)
        : [...selected, id];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
