import { useState, useEffect, useCallback } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import ListWrapper from "./ListWrapper";
import { useTheme } from "@mui/styles";

// Setting up the variables that depend on the table's type.
const findPhraseOrOtherUseVariables = (type, handleDeleteRow) => {
    let characterGridColumns, endpoint, title, tableID, requiredFields
    if (type === 'phrase') {
        characterGridColumns = [
            { field: 'phraseId', headerName: 'Kifejezés azonosítója', width: 170, editable: true},
            { field: 'phraseChinese', headerName: 'Kifejezés', width: 200, editable: true},
            { field: 'phraseHungarian', headerName: 'Jelentése', width: 300, editable: true},
            { field: 'pinyin', headerName: 'Kiejtés', width: 160, editable: true,
                description: 'Ha a kifejezés kiejtése nem következik alkotóelemeinek fő kiejtéséből, itt megadhatod (szóközzel elválasztva).'
            }, 
        ]

        endpoint = 'all-phrases'
        title = 'Kifejezéstár'
        tableID = 'phraseId'
        requiredFields = ['phraseChinese', 'phraseHungarian']

    } else if (type === 'other-use') {
        characterGridColumns = [
            { field: 'otherUseId', headerName: 'Jelentés azonosítója', width: 170, editable: true},
            { field: 'charChinese', headerName: 'Karakter', width: 200, editable: true},
            { field: 'otherUseHungarian', headerName: 'Egyéb jelentés', width: 300, editable: true},
            { field: 'pinyin', headerName: 'Kiejtés', width: 160, editable: true,
                description: 'A karakter kiejtése, ha ebben az értelemben használatos.'
            },
            { field: 'delete', type: 'actions', width: 70, getActions: (params) => [(
                <GridActionsCellItem
                    icon={<DeleteIcon sx={{fontSize: '18px'}} />}
                    label="Törlés"
                    onClick={() => handleDeleteRow(params)}
                />
            )]}
        ]

        endpoint = 'all-other-uses'
        title = 'Egyéb jelentések'
        tableID = 'otherUseId'
        requiredFields = ['charChinese', 'otherUseHungarian', 'pinyin']
    } else return null

    return { characterGridColumns, endpoint, title, tableID, requiredFields }
}

const PhraseOrOtherUseList = ({ type }) => {
    const theme = useTheme()

    const [rowsChanged, setRowsChanged] = useState([])
    const [rowsDeleted, setRowsDeleted] = useState([])
    const [newEntryCounter, setNewEntryCounter] = useState(1)
    const [characterGridRows, setCharacterGridRows] = useState([])
    const [originalState, setOriginalState] = useState([])
    const [snackbar, setSnackbar] = useState(null);

    const handleDeleteRow = (params) => {
        // Temporary rows can be deleted on the frontend without being sent to the backend.
        if (!rowsDeleted.includes(params.id) && !params.id.toString().startsWith('ÚJ')) setRowsDeleted(prev => [...prev, params.id])
        if (rowsChanged.includes(params.id)) setRowsChanged(prev => prev.filter(id => id !== params.id))

        // The filter needs to be wrapped in setTimeout to prevent a race condition (and an error therefore).
        setTimeout(() => {
            setCharacterGridRows(prev => prev.filter(row => row[tableID] !== params.id))
        })
    }

    // Get the needed info based on which database we're looking at.
    const { characterGridColumns, endpoint, title, tableID, requiredFields } = findPhraseOrOtherUseVariables(type, handleDeleteRow)

    // Rows are marked for sending when they've been changed and all required fields are filled out.
    const validateRow = (row) => rowsChanged.includes(row[tableID]) && requiredFields.every(item => row[item]) ? true : false

    const handleAddNewRow = () => {
        setCharacterGridRows((prev) => [...prev, { [tableID]: `ÚJ-${newEntryCounter}` }])
        setNewEntryCounter(newEntryCounter + 1)
    }
  
    const handleCellEditCommit = useCallback(async (params) => {
        const changedField = {id: params.id, [params.field]: params.value}
        setCharacterGridRows(prev => prev.map(row => (row[tableID] === params.id ? { ...row, ...changedField } : row)))
        if (!rowsChanged.includes(params.id)) setRowsChanged(prev => [...prev, params.id])
    }, [tableID, rowsChanged]);

    const handleRevertChanges = () => {
        setCharacterGridRows(originalState)
        setSnackbar({ children: 'A táblázat visszaállt a mentett állapotba.', severity: 'warning' });
        setRowsChanged([])
        setRowsDeleted([])
        setNewEntryCounter(1)
    }

    const handleSaveChanges = async () => {
        const changedRows = characterGridRows.filter(row => validateRow(row))
        let request = [...changedRows]

        // Create a "deletion flag object" for all IDs in the rowsDeleted array.
        if (rowsDeleted?.length) {
            for (let i = 0; i < rowsDeleted.length; i++) {
                let deletionFlag = {[tableID]: rowsDeleted[i], delete: true}
                request.push(deletionFlag)
            }
        }

        // Send the request.
        try {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/admin/${endpoint}/update`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(request),
            }
          );
            if (response?.ok) {
                let responseJSON = await response.json()
                setSnackbar({ children: responseJSON.message, severity: 'success' });

                // If new entries were created, they were given proper IDs. Update them in the table.
                if (responseJSON.newEntriesIDs) {
                    setCharacterGridRows(prev =>
                    prev.map(row => {
                        let temporaryID = row[tableID]
                        let newIDObject = responseJSON.newEntriesIDs.find(object => object[temporaryID])
                        return (newIDObject ? { ...row, [tableID]: newIDObject[temporaryID]} : row)})
                    )
                }

                // Reset all applicable states.
                setOriginalState(characterGridRows)
                setRowsChanged([])
                setRowsDeleted([])
                setNewEntryCounter(1)
            } else if (response) {
                let responseJSON = await response.json()
                setSnackbar({ children: responseJSON.message, severity: 'error' });
            }
        } catch (error) {
            console.log(error)
            setSnackbar({ children: 'Hiba történt a mentéskor.', severity: 'error' });
          }
    }

    // On mount, populate the grid.
    try {
    useEffect(() => {
        const fetchTable = async () => {
            const table = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/${endpoint}`);
            const tableJSON = await table.json();
            if (tableJSON) {
                setCharacterGridRows(tableJSON)
                setOriginalState(tableJSON)
            }
        }
        fetchTable()
    }, [endpoint])
    } catch (err) {
        console.log(err)
    }

    return (
    <ListWrapper {...{title}}>
        <DataGrid
            autoHeight
            rows={characterGridRows} 
            columns={characterGridColumns} 
            getRowId={row => row[tableID]}
            onCellKeyDown={(_, event) => event.nativeEvent.stopImmediatePropagation()} // Prevent theme change.
            getRowClassName={params => validateRow(params.row) && 'data-grid--edited'}
            disableSelectionOnClick
            onCellEditCommit={handleCellEditCommit}
        />
        
        {!!snackbar && (
        <Snackbar open onClose={() => setSnackbar(null)} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
        )}

        <Box display='flex' justifyContent='space-between' marginTop='10px'>
            <Button 
                    onClick={handleAddNewRow} 
                    variant='outlined' sx={{
                        borderColor: theme.palette.primary.detailsElementText, 
                        color: theme.palette.primary.detailsElementText, 
                        backgroundColor: theme.palette.background.taglineSecondary,
                        px: '8px',
                        '&:hover': { borderColor: theme.palette.primary.dark, color: theme.palette.primary.dark }
                }}>
                    Új sor
            </Button>

            {(!!rowsChanged.length || !!rowsDeleted.length) && (
            <Box>
                <Button 
                    onClick={handleRevertChanges} 
                    variant='outlined' sx={{
                        borderColor: theme.palette.primary.detailsElementText, 
                        color: theme.palette.primary.detailsElementText, 
                        backgroundColor: theme.palette.background.taglineSecondary,
                        marginRight: '10px', px: '8px',
                        '&:hover': { borderColor: theme.palette.primary.dark, color: theme.palette.primary.dark }
                }}>
                    Változtatások elvetése
                </Button>

                <Button 
                    onClick={handleSaveChanges}
                    sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.primary.contrastText,
                        '&:hover': { backgroundColor: theme.palette.primary.lightPrimitive } }}
                
                >
                    Változtatások mentése
                </Button>
            </Box>
            )}
        </Box>
    </ListWrapper>            
)}

export default PhraseOrOtherUseList