import  React from 'react';
import {Delete, Edit} from '@material-ui/icons'
const Test = () => {
   return (
    <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">Treatment  Number:</th>
          <th scope="col">Treatment  Information</th>
          <th scope="col">Date</th>
          <th scope="col">Worker email  </th>
          <th scope="col">Car Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1,001</td>
          <td>random</td>
          <td>data</td>
          <td>placeholder</td>
          <td>text</td>
          <td>
              <button>
                  <Edit/>
              </button>
              <button>
                  <Delete/>
              </button>
          </td>
        </tr>
        <tr>
          <td>1,002</td>
          <td>placeholder</td>
          <td>irrelevant</td>
          <td>visual</td>
          <td>layout</td>
          <td>
              <button>
                  <Edit/>
              </button>
              <button>
                  <Delete/>
              </button>
          </td>
        </tr>
       
      </tbody>
    </table>
  </div>
   )
}

export default Test
