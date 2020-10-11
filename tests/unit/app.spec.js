expect = require('chai').expect
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('ui rendering when passed', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.title-header').text()).equal("Add a new contact:")
    expect(wrapper.find('.first-label').text()).equal("First Name:")
    expect(wrapper.find('.second-label').text()).equal("Last Name:")
    expect(wrapper.find('.third-label').text()).equal("Phone Number:")
    expect(wrapper.find('.submitButton').text()).equal("Add New Contact")

    console.log('Copywriting passed')
    
    const mockData = [
      { firstName: 'Haley', lastName: 'Prichet', phoneNumber: '019232323' },
      { firstName: 'John', lastName: 'Wick', phoneNumber: '0195873473' },
      { firstName: 'Micheal', lastName: 'Jordan', phoneNumber: '0195873471'},
      { firstName: 'Son', lastName: 'Goku', phoneNumber: '0195873470' },
   ];
    const rows = wrapper.findAll('tbody > tr').wrappers


    rows.forEach((tr, rowIndex) => {
      const firstCell = tr.find('.first-column');
      const secondCell = tr.find('.second-column');
      const thirdCell = tr.find('.third-column');

      expect(firstCell.text()).equal(mockData[rowIndex].firstName);
      expect(secondCell.text()).equal(mockData[rowIndex].lastName);
      expect(thirdCell.text()).equal(mockData[rowIndex].phoneNumber);

      console.log('Row ' + parseInt(rowIndex + 1) + ' data passed')

   });
  })  

  it('Add contact', async () => {
    const wrapper = mount(App)

    wrapper.vm.title = 'Add a new contact:'
    wrapper.vm.submitButton = 'Add New Contact'
    wrapper.vm.userFirstname = 'Jack'
    wrapper.vm.userLastname = 'Chan'
    wrapper.vm.userPhone = '0173380213'
    wrapper.vm.phoneBookRows = [
      { firstName: 'Haley', lastName: 'Prichet', phoneNumber: '019232323' },
      { firstName: 'John', lastName: 'Wick', phoneNumber: '0195873473' },
      { firstName: 'Micheal', lastName: 'Jordan', phoneNumber: '0195873471'},
      { firstName: 'Son', lastName: 'Goku', phoneNumber: '0195873470' },
    ]
    await wrapper.vm.submit()
    const rows = wrapper.findAll('tbody > tr').wrappers
    const mockData = [
        { firstName: 'Haley', lastName: 'Prichet', phoneNumber: '019232323' },
        { firstName: 'John', lastName: 'Wick', phoneNumber: '0195873473' },
        { firstName: 'Micheal', lastName: 'Jordan', phoneNumber: '0195873471'},
        { firstName: 'Son', lastName: 'Goku', phoneNumber: '0195873470' },
        { firstName: 'Jack', lastName: 'Chan', phoneNumber: '0173380213' },
      ]
    
    rows.forEach((tr, rowIndex) => {
      const firstCell = tr.find('.first-column');
      const secondCell = tr.find('.second-column');
      const thirdCell = tr.find('.third-column');

      expect(firstCell.text()).equal(mockData[rowIndex].firstName);
      expect(secondCell.text()).equal(mockData[rowIndex].lastName);
      expect(thirdCell.text()).equal(mockData[rowIndex].phoneNumber);
    });

    console.log('Add contact test case passed')
  })

  it('Edit contact', async () => {
    const wrapper = mount(App)
    wrapper.vm.title = 'Add a new contact:'
    wrapper.vm.submitButton = 'Add New Contact'
    await wrapper.vm.editRow()
    expect(wrapper.find('.title-header').text()).equal("Edit contact :")
    expect(wrapper.find('.submitButton').text()).equal("Edit Contact")
    wrapper.vm.userFirstname = 'John'
    wrapper.vm.userLastname = 'Wick'
    wrapper.vm.userPhone = '0193318220'
    wrapper.vm.selectedIndex = 1

    await wrapper.vm.submit()
   const rows = wrapper.findAll('tbody > tr').wrappers
   const mockData = [
      { firstName: 'Haley', lastName: 'Prichet', phoneNumber: '019232323' },
      { firstName: 'John', lastName: 'Wick', phoneNumber: '0193318220' },
      { firstName: 'Micheal', lastName: 'Jordan', phoneNumber: '0195873471'},
      { firstName: 'Son', lastName: 'Goku', phoneNumber: '0195873470' },
    ]
  
   rows.forEach((tr, rowIndex) => {
     const firstCell = tr.find('.first-column');
     const secondCell = tr.find('.second-column');
     const thirdCell = tr.find('.third-column');

     expect(firstCell.text()).equal(mockData[rowIndex].firstName);
     expect(secondCell.text()).equal(mockData[rowIndex].lastName);
     expect(thirdCell.text()).equal(mockData[rowIndex].phoneNumber);
  });

    console.log('Edit contact test case passed')
  })

  it('Remove contact', async () => {
    const wrapper = mount(App)
    await wrapper.vm.deleteRow(2)
    const rows = wrapper.findAll('tbody > tr').wrappers
    const mockData = [
        { firstName: 'Haley', lastName: 'Prichet', phoneNumber: '019232323' },
        { firstName: 'John', lastName: 'Wick', phoneNumber: '0195873473' },
        { firstName: 'Son', lastName: 'Goku', phoneNumber: '0195873470' },
      ]
    
    rows.forEach((tr, rowIndex) => {
      const firstCell = tr.find('.first-column');
      const secondCell = tr.find('.second-column');
      const thirdCell = tr.find('.third-column');

      expect(firstCell.text()).equal(mockData[rowIndex].firstName);
      expect(secondCell.text()).equal(mockData[rowIndex].lastName);
      expect(thirdCell.text()).equal(mockData[rowIndex].phoneNumber);
    });

    console.log('Delete contact test case passed')
  })
})


  