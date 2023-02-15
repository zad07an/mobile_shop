import React from 'react'
import './ProductSpec.css'

export default function ProductSpec({product}) {
  return (
    <div className='product_specification_container'>
      <table className='product_table'>
        <thead className='table_header'>
          <tr>
            <th colSpan='2'>Basic Information</th>
          </tr>
        </thead>
        <tbody className='table_body'>
          <tr>
            <td>Ապրանքի կոդը</td>
            <td>{product.article}</td>
          </tr>
          <tr>
            <td>Բռենդ</td>
            <td>{product.brand}</td>
          </tr>
          <tr>
            <td>Մոդել</td>
            <td>{product.title}</td>
          </tr>
        </tbody>
      </table>
      <table className='product_table'>
        <thead className='table_header'>
          <tr>
            <th colSpan='2'>Display</th>
          </tr>
        </thead>
        <tbody className='table_body'>
          <tr>
            <td>Դիսփլեյի չափսը</td>
            <td>{product.display_size}"</td>
          </tr>
          <tr>
            <td>Էկրանի կետայնությունը</td>
            <td>{product.display_resolution}</td>
          </tr>
          <tr>
            <td>Դիսփլեյի տեխնոլոգիա</td>
            <td>{product.display_technology}</td>
          </tr>
          <tr>
            <td>Լրացուցիչ հնարավորություններ</td>
            <td>{product.description}</td>
          </tr>
        </tbody>
      </table>
      <table className='product_table'>
        <thead className='table_header'>
          <tr>
            <th colSpan='2'>Processor</th>
          </tr>
        </thead>
        <tbody className='table_body'>
          <tr>
            <td>Հիշողություն</td>
            <td>{product.storage}</td>
          </tr>
          <tr>
            <td>Պրոցեսոր</td>
            <td>{product.processor}</td>
          </tr>
          <tr>
            <td>Պրոցեսորի միջուկների քանակը</td>
            <td>{product.processor_cores}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
