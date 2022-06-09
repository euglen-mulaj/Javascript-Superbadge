// imports
// import getBoatTypes from the BoatDataService => getBoatTypes method';
import { LightningElement, track, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
// import BOAT_NAME from '@salesforce/schema/BoatType__c.Name';
// import BOAT_ID from '@salesforce/schema/BoatType__c.Id';
// import { publish, MessageContext } from 'lightning/messageService';
// import BoatMessageChannel from '@salesforce/messageChannel/BoatMessageChannel';


export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    @track
    searchOptions;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
    // boatTypes;

      boatTypes({ error, data }) {
      if (data) {
        this.searchOptions = data.map(type => {
          // TODO: complete the logic
          return  { label: type.Name, value: type.Id };
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      this.selectedBoatTypeId =  event.detail.value;
      // Create the const searchEvent
      const searchEvent = new CustomEvent('search',{
        detail : {
          boatTypeId : this.selectedBoatTypeId
        }
      });
      // searchEvent must be the new custom event search
      // searchEvent;
      this.dispatchEvent(searchEvent);
    }
  }
  