import { Button } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { on } from "stream";
export default function EventCalendarButton({timestamp,onSelect,isActive}){
    function formatTimestampToDate(timestamp) {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        const date = new Date(timestamp);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
      
        return `${day} ${month}`;
      }
      function getDayName(timestamp){
        const days = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
      
        const date = new Date(timestamp);
        const dayIndex = date.getUTCDay();
      
        return days[dayIndex];
      };
      
    return(
        <div>
           <Button
  variant="contained"
  sx={{
    m: 3,
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',     
    justifyContent: 'center', 
    height: '90px',
    width:'90px',          
    backgroundColor: ` ${isActive?'#00003B':'#d3d3d3'}`,
    textAlign: 'center',
    color: `${isActive?'#ffffff':'#000000'}`,            
    '&:hover': {
      backgroundColor:'#00003B' , 
      color: '#fff',             
    },
  }}
  
  startIcon={<CalendarMonthIcon />}
  onClick={() => onSelect(timestamp)}>
    <span>{getDayName(timestamp)}</span>
  <span>{formatTimestampToDate(timestamp)}</span>
  
</Button>
        </div>
    )
}