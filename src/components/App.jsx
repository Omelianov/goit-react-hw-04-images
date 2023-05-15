import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import axios from "axios";




export class App extends Component  {
  render(){
  return (
    <div>
      <Searchbar />
    </div>
  );
  }
}
