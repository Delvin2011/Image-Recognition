import React from 'react';
import './ConceptTable.css';

class ProductCategoryRow extends React.Component {
    render() {
      const category = this.props.category;
      const Model = this.props.Model;
     // console.log(Model);
      return (
        <tr> {
          category === "Concept: 1" && Model === "Celebrity"
          ?
          <th colSpan="2" id  = "con1">
            {category}
          </th>
          : category === "Concept: 2" && Model === "Celebrity"
          ? 
            <th colSpan="2" id  = "con2">
              {category}
            </th>
          : category === "Concept: 3" && Model === "Celebrity"
          ?
            <th colSpan="2" id  = "con3">
              {category}
            </th>
          : category === "Concept: 4" && Model === "Celebrity"
          ? 
            <th colSpan="2" id  = "con4">
              {category}
            </th>
          :
            <th colSpan="2">
              {category}
            </th>
        }
        </tr>
      );
    }
  }
  
  class ProductRow extends React.Component {
    render() {
      const product = this.props.product;
  
      return (
        <tr> 
            <td>{product.name}</td>
            <td>{product.value}</td>      
        </tr>
      );
    }
  }
  
  class ProductTable extends React.Component {
    render() {

      const rows = [];
      let lastCategory = null;
      console.log(this.props.products);
     console.log(this.props.ModelField);
      this.props.products.forEach((product) => {
        if (product.category !== lastCategory) {
          rows.push(
            <ProductCategoryRow
              category={product.category}
              Model = {this.props.ModelField.label}
              key={product.category} />
          );
        }
        rows.push(
          <ProductRow
            product={product}
            key={product.name}
          />
        );
      });
  
      return (
        <table>
          <thead>
            <tr>
              <th>Predicted</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  

  
  class ConceptTable extends React.Component {
    render() {
      return (
        <div >
            <div className='relative mt4 ml3 dark-gray f2'>
                <ProductTable products={this.props.products} ModelField = {this.props.ModelField}/>
            </div>
        </div>
      );
    }
  }
  
  
  export default ConceptTable;