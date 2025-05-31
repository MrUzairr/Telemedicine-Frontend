import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, CircularProgress, Typography, TextField } from '@mui/material';
import { useTable } from 'react-table';

const TableData = () => {
  const [tableName, setTableName] = useState('tasks'); // Default table name
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // To store filtered data based on search query
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3005/tasks/data/${tableName}`);
      setData(response.data);
      setFilteredData(response.data); // Set both data and filteredData initially
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Handle table selection change
  const handleTableChange = (e) => {
    setTableName(e.target.value);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(data); // If no search query, show all data
    } else {
      const filtered = data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  // Columns for React Table
  const columns = React.useMemo(() => {
    if (filteredData.length === 0) return [];
    return Object.keys(filteredData[0]).map((key) => ({
      Header: key,
      accessor: key,
    }));
  }, [filteredData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  useEffect(() => {
    fetchData();
  }, [tableName]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Table Data Viewer
      </Typography>

      {/* Table selection dropdown */}
      <div>
        <Select
          value={tableName}
          onChange={handleTableChange}
          displayEmpty
          style={{ marginBottom: '20px', marginRight: '10px' }}
        >
          <MenuItem value="tasks">Tasks</MenuItem>
          <MenuItem value="custom_fields">Custom Fields</MenuItem>
          <MenuItem value="followers">Followers</MenuItem>
          <MenuItem value="projects">Projects</MenuItem>
          <MenuItem value="workspace">Workspace</MenuItem>
          <MenuItem value="comments">Comments</MenuItem>
        </Select>
        <Button onClick={fetchData} variant="contained" color="primary">
          Refresh Data
        </Button>
      </div>

      {/* Search field */}
      <div style={{ margin: '20px 0' }}>
        <TextField
          label="Search Records"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
        />
      </div>

      {/* Loading and error messages */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display table */}
      {!loading && !error && filteredData.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* No data message */}
      {filteredData.length === 0 && !loading && !error && (
        <Typography>No data available for table "{tableName}".</Typography>
      )}
    </div>
  );
};

export default TableData;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TableData = () => {
//   const [tableName, setTableName] = useState('tasks'); // Default table name
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Function to fetch data from the API
//   const fetchData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:3005/tasks/data/${tableName}`);
//       setData(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data when tableName changes
//   useEffect(() => {
//     fetchData();
//   }, [tableName]);

//   // Handle table selection change
//   const handleTableChange = (e) => {
//     setTableName(e.target.value);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Table Data Viewer</h1>

//       {/* Table selection dropdown */}
//       <div>
//         <label htmlFor="table-select">Select Table:</label>
//         <select id="table-select" value={tableName} onChange={handleTableChange}>
//           <option value="tasks">Tasks</option>
//           <option value="custom_fields">Custom Fields</option>
//           <option value="followers">Followers</option>
//           <option value="projects">Projects</option>
//           <option value="workspace">Workspace</option>
//           <option value="comments">Comments</option>
//         </select>
//         <button onClick={fetchData} style={{ marginLeft: '10px' }}>
//           Refresh Data
//         </button>
//       </div>

//       {/* Loading and error messages */}
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {/* Displaying data in a table */}
//       {data.length > 0 && (
//         <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               {/* Table headers based on object keys */}
//               {Object.keys(data[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/* Table rows */}
//             {data.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((value, idx) => (
//                   <td key={idx}>{value === null ? 'N/A' : value.toString()}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* No data message */}
//       {data.length === 0 && !loading && !error && (
//         <p>No data available for table "{tableName}".</p>
//       )}
//     </div>
//   );
// };

// export default TableData;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TableData = () => {
//   const [tableName, setTableName] = useState('tasks'); // Default table name
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:3005/tasks/data/${tableName}`);
//       setData(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [tableName]);

//   const handleTableChange = (e) => {
//     setTableName(e.target.value);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Table Data Viewer</h1>
//       <div>
//         <label htmlFor="table-select">Select Table:</label>
//         <select id="table-select" value={tableName} onChange={handleTableChange}>
//           <option value="tasks">Tasks</option>
//           <option value="custom_fields">Custom Fields</option>
//           <option value="followers">Followers</option>
//           <option value="projects">Projects</option>
//           <option value="workspace">Workspace</option>
//           <option value="comments">Comments</option>
//         </select>
//         <button onClick={fetchData} style={{ marginLeft: '10px' }}>
//           Refresh Data
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {data.length > 0 && (
//         <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               {Object.keys(data[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((value, idx) => (
//                   <td key={idx}>{value === null ? 'N/A' : value.toString()}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {data.length === 0 && !loading && !error && <p>No data available for table "{tableName}".</p>}
//     </div>
//   );
// };

// export default TableData;
