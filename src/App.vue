<template>
  <div class="body">
    <p class="title-header"><strong>{{title}}</strong></p>
    <div class="form">
      <div class="form-item">
        <label class="first-label">First Name:</label>
        <br />
        <input type="text" class="userFirstname" v-model="userFirstname"/>
        <br />
      </div>
      <div class="form-item">
        <label class="second-label">Last Name:</label> 
        <br />
        <input type="text" class="userLastname"  v-model="userLastname"/>
        <br />
      </div>
      <div class="form-item">
        <label class="third-label">Phone Number:</label>
        <br />
        <input type="number" class="userPhone"  v-model="userPhone"/>
        <br />
      </div>
      <button class="submitButton" v-on:click="submit">{{submitButton}}</button>
    </div>
    <div class="table">
      <p class="table-header"><strong>Contact List</strong></p>
      <table id="phoneBookItems" class="informationTable">
        <!-- items should go here -->
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
           <tbody>
            <tr class="table-tr" v-for="(phoneBookRow,i) in phoneBookRows" :key="i">
              <td class="first-column"> {{phoneBookRow.firstName}} </td>
              <td class="second-column"> {{phoneBookRow.lastName}}  </td>
              <td class="third-column"> {{phoneBookRow.phoneNumber}}  </td>
              <td> 
                <button @click="editRow(phoneBookRow, i)">Edit</button>
                <button @click="deleteRow(i)">Delete</button>
              </td>
            </tr>
          </tbody>
      </table>
    </div>

  </div>
</template>

<script>

  export default {
    name: "App",
    data() {
      return {
        selectedIndex: -1,
        items: [],
        title: 'Add a new contact:',
        submitButton: 'Add New Contact',
        userFirstname: '',
        userLastname: '',
        userPhone: '',
        phoneBookRows:  [{
                            'firstName': 'Haley',
                            'lastName': 'Prichet',
                            'phoneNumber': '019232323',
                          },{
                            'firstName': 'John',
                            'lastName': 'Wick',
                            'phoneNumber': '0195873473',
                          },{
                            'firstName': 'Micheal',
                            'lastName': 'Jordan',
                            'phoneNumber': '0195873471',
                          },{
                            'firstName': 'Son',
                            'lastName': 'Goku',
                            'phoneNumber': '0195873470',
                          }]
      }
    },
    methods: {
      submit() {
        const newContact = {
          firstName: this.userFirstname,
          lastName: this.userLastname,
          phoneNumber: this.userPhone
        }

        if(this.submitButton === 'Edit Contact') {
          this.title = 'Add a new contact:'
          this.submitButton = 'Add New Contact'
          this.phoneBookRows[this.selectedIndex] = newContact
        } else {
          this.phoneBookRows.push(newContact)
        }

        this.userFirstname = ''
        this.userLastname = ''
        this.userPhone = ''
      },
      editRow(editRowItem, index) {
        this.title = 'Edit contact :'
        this.submitButton = 'Edit Contact'
        const selectedItem = { ...editRowItem }
        this.selectedIndex = index
        this.userFirstname = selectedItem.firstName
        this.userLastname = selectedItem.lastName
        this.userPhone = selectedItem.phoneNumber
      },
      deleteRow(item) {
        this.phoneBookRows.splice(item, 1);
      }
    }
  };
</script>

<style scoped>
  .body {
    margin: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table, th, td {
    border: 1px solid black;
  }

  th {
    height: 50px;
  }
  td {
    height: 30px;
    text-align: center;
  }

  .title-header {
    font-size: 25px;
    margin-left: 10px;
    color: black;
  }

  .table-header {
    font-size: 25px;
    margin-left: 10px;
    color: black;
  }
  label {
    font-size: 18px;
    font-weight: 500;
  }

  input {
    width: 300px;
    height: 30px;
  }

  .form-item {
    margin: 20px 0;
  }

  .form {
    margin: 20px 0;
  }

  .submitButton {
    width: 200px;
    height: 30px;
    margin: 10px 0;
  }

</style>