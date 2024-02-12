import React, { useState ,useEffect} from 'react'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PostAddIcon from '@mui/icons-material/PostAdd';
import "../../style/widgets/widgets.scss"
import axios from "axios";

function Performa_widgets({type}){
    let data;
    const [purchasecount,setpurchasecount]=useState("")
    const [porforma,setporforma]=useState("")
    const [invoice,setinvoice]=useState("")
    const [bldraftcount,setbldraftcount]=useState("")
    useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/expo/countPurchase/")
          .then((response) => {
            setpurchasecount(response.data.purchase_count);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
    useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/expo/countPorforma/")
          .then((response) => {
            setporforma(response.data.porforma_count);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
      console.log("purchaseCount",purchasecount)
    useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/expo/countInvoice/")
          .then((response) => {
            setinvoice(response.data.INVOICE_COUNT);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
      console.log("invoice",invoice)

      useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/expo/countBLdraft/")
          .then((response) => {
            setbldraftcount(response.data.blcount);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
      
    switch (type) {
        case 'Purchase_order':
            data = {
                title: 'Purchase Order',
                icon: <AttachMoneyIcon className='icon' />,
                value: purchasecount
            }
            
            break;
            case 'Porforma':
                data = {
                    title: 'Porforma Invoice',
                    icon: <PostAddIcon className='icon' />,
                    value: porforma
            }

            break;
        case 'Invoice':
            data = {
                title: 'Invoice',
                icon: <PostAddIcon className='icon' />,
                value: invoice
            }

            break;
        case 'BL_draft':
            data = {
                title: 'BL Draft',
                icon: <PostAddIcon className='icon' />,
                value : bldraftcount
            }

            break;

        default:
            break;
    }
    // console.log("data title",data.title)
    return (
        <div className="widgets">
            <div className="left">
                <span className='title'>{data.title}</span>
                
                <span className='Counter'>{data.value}</span>
            </div>
            <div className="right">
                <span className='icon'>{data.icon}</span>
            </div>

        </div>
    )
}
export default Performa_widgets