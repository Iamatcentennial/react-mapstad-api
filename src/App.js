import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state ={
      buildings:[],
      mobiles:[]
    }
  }
  componentDidMount(){
    this.fetchBuildingsData();
    this.fetchMobilesData();
  }
// Fetching the Buildings data
  fetchBuildingsData(){
    fetch('http://interview.mapsted.com/RnD/test-buildings.json')
    .then(response=>response.json())
    .then(data=>this.setState({buildings:data}))
    .catch(err=>console.log(err))
  }
 // Fetching the Mobiles data 
  fetchMobilesData(){
    fetch('http://interview.mapsted.com/RnD/test-analytics.json')
    .then(response=>response.json())
    .then(data=>this.setState({mobiles:data}))
    .catch(err=>console.log(err));
    
  }
  
  calculateSamsungDevicesCost(){
    // Extracting all samsung manufacturers and return array of objects
    const samsungDevices = this.state.mobiles.filter(brand=>brand.manufacturer==='Samsung');
    // Extract all the session infos 
    const session_infos = samsungDevices.map((device)=>device.usage_statistics.session_infos);
   var cost=0;
    for(var value1 of session_infos){
      for(var value2 of value1){
        for(var value3 of value2.purchases){
          cost+=value3.cost;
        }
      }
    }
    console.log(cost);
    return cost;
    
  }

  // Number of times an item is purchased
  numberOfTimesItemPurchased(){
    const session_infos = this.state.mobiles.map((device)=>device.usage_statistics.session_infos);
   var id=0;
    for(var value1 of session_infos){
      for(var value2 of value1){
        for(var value3 of value2.purchases){
          if(value3.item_id===47){
            id++;
          }
        }
      }
    }
    console.log(id);
    return id;
  }
// Totlal purchase const according to item category
  totalPurchaseCostItemCategory(){
    const session_infos = this.state.mobiles.map((device)=>device.usage_statistics.session_infos);
   var item_category_cost=0;
    for(var value1 of session_infos){
      for(var value2 of value1){
        for(var value3 of value2.purchases){
          if(value3.item_category_id===7){
            item_category_cost+=value3.cost;
          }
        }
      }
    }
    console.log(item_category_cost);
    return item_category_cost;
  }
// Purchases cost in Ontario
  purchaseCostInOntario(){
  const ontarioBuildings = this.state.buildings.filter(building=>(building.state==='Ontario'));
  const session_infos = this.state.mobiles.map((device)=>device.usage_statistics.session_infos);
  let purchaseCost =0;
  for(var value1 of ontarioBuildings){
     for(var val1 of session_infos){
      for(var val2 of val1){
        if(val2.building_id === value1.building_id){
          for(var value3 of val2.purchases){
            purchaseCost+=value3.cost;
          }
        }
      }
    }
  }
  console.log(purchaseCost);
  return purchaseCost;
  }
  
  // Purchases cost in US
  purchaseCostInUS(){
    const usBuildings = this.state.buildings.filter(building=>(building.country==='United States'));
    const session_infos = this.state.mobiles.map((device)=>device.usage_statistics.session_infos);
    let purchaseCost =0;
    for(var value1 of usBuildings){
       for(var val1 of session_infos){
        for(var val2 of val1){
          if(val2.building_id === value1.building_id){
            for(var value3 of val2.purchases){
              purchaseCost+=value3.cost;
            }
          }
        }
      }
    }
    console.log(purchaseCost);
    return purchaseCost;
    }

    // Building which has maximum purchase cost
    buildingPurchaseCost(){
      const session_infos = this.state.mobiles.map((device)=>device.usage_statistics.session_infos);
   var building_cost= new Array(50);
    for(var value1 of session_infos){
      for(var value2 of value1){
        var building_id=value2.building_id;
        for(var value3 of value2.purchases){
          building_cost[building_id-1]+=value3.cost;
        }
       // console.log(building_cost[building_id-2])
      }
    }
    //console.log(building_cost);
    //return building_cost;
    }

  render() {
    return (
      <div className="App container mt-5">
      <table className="table table-dark text-justify">
      <thead>
      <tr>
      <th>Description</th>
      <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>Total purchase costs for Samsung manufacture devices:</td>
      <td> {(this.calculateSamsungDevicesCost()).toFixed(2)}</td>
      </tr>
      <tr>
      <td>Total number of times item (item_id = 47) was purchased:</td>
      <td>{(this.numberOfTimesItemPurchased()).toFixed(2)}</td>
      </tr>
      <tr>
      <td>Total purchase costs for item’s in the category (item_category_id = 7):</td>
      <td>{(this.totalPurchaseCostItemCategory()).toFixed(2)}</td>
      </tr>
      <tr>
      <td>Total purchase costs in Ontario:</td>
      <td>{(this.purchaseCostInOntario()).toFixed(2)}</td>
      </tr>
      <tr>
      <td>Total purchase costs in the United States</td>
      <td>{(this.purchaseCostInUS()).toFixed(2)}</td>
      </tr>
      <tr>
      {this.buildingPurchaseCost()}
      </tr>
      </tbody>
      </table>
           </div>
    );
  }
}

export default App;
