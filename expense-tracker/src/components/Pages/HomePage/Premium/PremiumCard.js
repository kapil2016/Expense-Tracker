import styles from './PremiumCard.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themeState } from '../../../States/Reducers/theme-reducer';
import Papa from 'papaparse';
function downloadCsv(filename, data) {
  const csv = Papa.unparse(data);
  const csvBlob = new Blob([csv], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(csvBlob);
  const link = document.createElement('a');
  link.setAttribute('href', csvUrl);
  link.setAttribute('download', filename);
  link.click();
}

function convertObjectToCSV(data){
  const csvData = [];
// add headers as first row
csvData.push(["amount", "category", "date" , "description"]);

// loop through data and add each row
for (const name in data) {
  const row = [];
  // row.push(name);
  row.push(data[name].amount);
  row.push(data[name].category);
  row.push(data[name].date);
  row.push(data[name].description)
  csvData.push(row);
}
 return csvData
}


function PremiumCard() {
    const[activatePremium , setActivatePremium] = useState(false)
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const expenseList = useSelector((state) => state.expense.expenseList);
  const dispatch = useDispatch();
  
  const handleToggleTheme = () => {
    dispatch(themeState.toggleTheme());
  };

  function downloadExpenseHandler(){
    const csvData = convertObjectToCSV(expenseList);
    downloadCsv('myExpense.csv', csvData);
  }

  return (
    <div className={[styles.card, isDarkMode ? styles.dark : ''].join(' ')}>
      {!activatePremium&&<h2 className={styles.title}>Activate Premium</h2>}
      <div className={styles.buttonGroup}>
       {!activatePremium&& <button className={styles.button} onClick={()=>setActivatePremium(true)}>Activate Premium</button>}
       {activatePremium &&<> <button className={styles.button} onClick={handleToggleTheme}>Change Theme</button>
        <button className={styles.button} onClick={downloadExpenseHandler}>Download Expenses</button></>}
      </div>
    </div>
  );
}
export default PremiumCard
