import 'bootstrap/dist/css/bootstrap.min.css';
import georgicImage from '../components/assets/grocery-cart.png'
import { useEffect, useState } from 'react';

const Mainpage = () => {

    const [inputval , setInputVal] = useState('');
    const [geroceryItems, setGeroceryItems] = useState([])
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        determineCompleteStatue()
    } ,[geroceryItems])


    function handleInput(event) {
        setInputVal(event.target.value)
    }

    const determineCompleteStatue = () => {
        if (!geroceryItems.length) {
            return setIsComplete(false)
        }

        let isAllcomplete = true;

        geroceryItems.forEach((item) => {
            if (!item.complete) isAllcomplete = false;
        })
        setIsComplete(isAllcomplete)
    }
    
    function handleGroceryItems(e) {
        if(e.key === 'Enter'){
            if (inputval) {
                const GeroceryUpdated = [...geroceryItems]
                const itemIndex = GeroceryUpdated.findIndex(item => item.name === inputval)
    
                if (itemIndex === -1) {
                    GeroceryUpdated.push({
                        name: inputval,
                        quantity: 1,
                        complete: false
                    })
                }else {
                    GeroceryUpdated[itemIndex].quantity++
                }
    
                setGeroceryItems(GeroceryUpdated)
                setInputVal("")

                e.target.value = ''
            }
        }
    }
    const renderGeroceryItems = () => {
        return geroceryItems.map((item, index) => (
            <li key={item.name}>
                <div className='w-100 h-100 d-flex fs-4 mb-0'>

                    <div className='p-2'>
                        <input
                        style={{width:'20px'}}
                        type="checkbox" onChange={(e) => {
                            checkItemStatus(index, e.target.checked)
                        }}
                        value={item.complete}
                        checked={item.complete}
                        />
                    </div>
                    <div className='w-100 p-2'>
                        <p>
                            {item.name} {item.quantity > 1 && <span>x{item.quantity}</span>}
                        </p>
                    </div>
                    <div className='p-2' style={{marginLeft:'170px'}}>
                        <button onClick={() => handleRemoveItems(item.name)} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                </div>
            </li>
        ))
    }

    const handleRemoveItems = (key) => {
        const GeroceryUpdated = [...geroceryItems].filter(item => item.name !== key)    
        setGeroceryItems(GeroceryUpdated)
    }

    const checkItemStatus = (index, statue) => {
        const GeroceryUpdated = [...geroceryItems]
        GeroceryUpdated[index].complete = statue;
        setGeroceryItems(GeroceryUpdated)
    }

//Front
    return(
        <main className='w-100 h-100 d-flex mt-5 align-items-center'>

            <div className='w-100 h-100 d-flex mx-auto flex-column'>
                <div className='header'>
                    <button onClick={() => {
                        const GeroceryUpdated = [...geroceryItems].map(item => {
                            return {
                                ...item,
                                complete: false
                            };
                        })
                        setGeroceryItems(GeroceryUpdated)
                        
                    }}>
                        clear all
                    </button>
                    {isComplete && <h3 className='d-flex mx-auto text-success'>You're Done</h3>}
                    <h1>Shopping List</h1>
                </div>
                <div className='d-flex mx-auto'>
                    <img style={{width:'400px'}} src={georgicImage} alt="" />
                </div>
                <div className='d-flex mx-auto flex-column' style={{width:"20%"}}>
                    <div className='d-flex w-75' style={{marginLeft:'100px'}}>
                        <input 
                        onChange={handleInput}
                        onKeyDown={handleGroceryItems}
                        type="text"
                        className='item-input'
                        placeholder='Add An Item' />
                    </div>        
                    <ul className='w-100'>
                        {renderGeroceryItems()}
                    </ul>
                </div>
            </div>
        </main>
    )
}


export default Mainpage