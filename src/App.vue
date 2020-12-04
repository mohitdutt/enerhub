<template>
  <div id="app">
  <h2>Emerhub test project</h2>
  <hr/>
    <form @submit.prevent="updateFirebase" @input="updateFieldItems">
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="text"
                name="name"
                placeholder="firstName"
                v-model="formData.firstName"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="text"
                name="name"
                placeholder="lastName"
                v-model="formData.lastName"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                name="email"
                placeholder="email"
                v-model="formData.email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
        <div class="field">
          <div class="field is-expanded">
            <div class="field has-addons">
              
              <p class="control is-expanded">
                <input
                  class="input"
                  type="tel"
                  name="phone"
                  placeholder="phone"
                  v-model="formData.phone"
                />
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left has-icons-right">
              <input
                class="input"
                type="address"
                name="address"
                placeholder="address"
                v-model="formData.address"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      data in browser: {{ state == '' ? 'waiting for changes' : state }}
      <hr />
      <hr />
      completion progress: {{rateDisplay}}
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import { db } from './firebase';
import { debounce } from 'debounce';

const documentPath = 'emerhub/b8J8LlWLujh5RgDOgnn3';

export default {
  data() {
    return {
      state: 'loading', 
      formData: {},
      realData: null,
      firebaseData: null,
      errorMessage: '',
      rate: 0,
      rateDisplay: ""
    };
  },

  firestore() {
    return {
      firebaseData: db.doc(documentPath),
    };
  },

  methods: {
    async updateFirebase() {debugger
      console.log('called')
      try {
        await db.doc(documentPath).set(this.formData);
        this.checkSuccess(this.formData);
        this.state = 'synced';
      } catch (error) {
        this.errorMessage = JSON.stringify(error)
        this.state = 'error';
      }
    },
    checkSuccess(obj){debugger // put logic by taking care of for 5 inout scenrios otherwisse can make it general out of 100
      let rate = 0;
      if(obj.firstName != ""){
        rate += 20;
      }
       if(obj.lastName != ""){
        rate += 20;
      } if(obj.phone != ""){
        rate += 20;
      } if(obj.email != ""){
        rate += 20;
      } if(obj.address != ""){
        rate += 20;
      }
      this.rateDisplay = rate+"%";
    },
    revokeData() {debugger
      this.formData = { ...this.realData };
      this.updateFirebase();
      this.state = 'revoked';
    },

    updateFieldItems() {debugger
      this.state = 'modified';
      this.debouncedUpdate();
    },

    
    debouncedUpdate: debounce(function() {debugger
      this.updateFirebase()
    }, 1500)
  },

  created: async function () {debugger
    const docRef = db.doc(documentPath);

    let data = (await docRef.get() ).data();
    this.checkSuccess(data);
    if (!data) {
      data = { firstName: '', lastName: '', phone: '', email: '', address: '' }
      docRef.set(data)
    }

    this.realData = { ...data }; // new object for new data reference
    this.formData = data;
    this.state = 'synced'
  },
};
</script>

<style>
h1,
h2,
h3 {
  font-weight: 600;
}

#app {
  font-family: 'sofia-pro', sans-serif;
  text-align: center;
  padding: 10vh 15vw;
}

p.help {
  text-align: left;
}
</style>
