import React, { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { 
         getAllAsync,
         addAsync,
         selectProducts,
         deleteAsync,
         updateAsync,
         } from './CRUDSlice';
import { getAll } from './CRUDAPI';


const CRUD = () => {
    const products = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();
    const [desc, setdesc] = useState("")
    const [price, setprice] = useState(0)
    useEffect(() => {
      dispatch(getAllAsync())
    }, [])
    

  return (
    <div>
        <h5>CRUD - see my only if you are logged in!</h5>
        <input placeholder='Description' onChange={(e) => setdesc(e.target.value)}/>
        <input placeholder='Price' onChange={(e) => setprice(+e.target.value)}/>

        <button onClick={() => dispatch(addAsync({desc, price})) }>add data</button> 
        <button onClick={() => dispatch(getAllAsync()) }>load data</button> 
        
        {products.length}
        {products.map((prod,ind) => <div key={ind}>{prod.desc} {prod.price}
                                         <button onClick={() => dispatch(deleteAsync(prod.id || 0))}>Del {prod.id}</button>
                                         <button onClick={() => dispatch(updateAsync({id: prod.id, desc: desc, price: price }))}>Update</button>
                                    </div>)}
        <br/>
        

    </div>
  )
}

export default CRUD