import classes from './FilterBar.module.css';
export default function FilterBar(){
    return(
        <div className={classes.mainDivFilterBar}>
            <p >
                <label className={classes.labelItem}>Cautare</label>
                <input className={classes.inputItem}/>
            </p>
            <p>
                <label className={classes.labelItem}>Tip</label>
                <select className={classes.dropdown}>
                    <option value="option1">Divertisment</option>
                    <option value="option2">Cultural</option>
                    <option value="option3">Street Food</option>
                </select>
            
            </p>
            <p>
                <label className={classes.labelItem}>Oras</label>
                <select className={classes.dropdown}>
                    <option value="option1">Cluj</option>
                    <option value="option2">Timisoara</option>
                    <option value="option3">Bucuresti</option>
                </select>
            </p>
            <p>
                <label className={classes.labelItem}>Ordonare dupa</label>
                <select className={classes.dropdown}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>

            </p>
            <p>
                <label className={classes.labelItem}>Sortare</label>
                <select className={classes.dropdown}>
                    <option value="option1">Crescator</option>
                    <option value="option2">Descrescator</option>
                    
                </select>
            </p>
           
            <button className={classes.btnFiltrare}>Resetare</button>
           
        </div>
    )
}