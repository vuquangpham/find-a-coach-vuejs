<template>
  <form @submit.prevent="handleFormSubmit">
    <div class="form-control" :class="[{invalid: !firstName.isValid}]">
      <label for="firstName">Firstname</label>
      <input type="text" id="firstName" v-model.trim="firstName.val" @blur="clearValidity('firstName')">
      <p v-if="!firstName.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="[{invalid: !lastName.isValid}]">
      <label for="lastName">Lastname</label>
      <input type="text" id="lastName" v-model.trim="lastName.val" @blur="clearValidity('lastName')">
      <p v-if="!lastName.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="[{invalid: !description.isValid}]">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description.val"
                @blur="clearValidity('description')"></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="[{invalid: !rate.isValid}]">
      <label for="rate">Hourly Rate</label>
      <input type="text" id="rate" v-model.number="rate.val">
      <p v-if="!rate.isValid">Rate must not be smaller than 0.</p>
    </div>

    <div class="form-control" :class="[{invalid: !areas.isValid}]">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearValidity('areas')">
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearValidity('areas')">
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="clearValidity('areas')">
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">Areas must not be empty.</p>
    </div>
    <p v-if="formIsValid">Please fix the above errors and submit again! :class="" </p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton";

export default {
  components: {BaseButton},
  emits: ['save-data'],
  data(){
    return {
      firstName: {
        val: '',
        isValid: true,
        isValidCheck: (val) => val.length > 0
      },
      lastName: {
        val: '',
        isValid: true,
        isValidCheck: (val) => val.length > 0
      },
      description: {
        val: '',
        isValid: true,
        isValidCheck: (val) => val.length > 0
      },
      rate: {
        val: null,
        isValid: true,
        isValidCheck: (val) => typeof val === 'number'
      },
      areas: {
        val: [],
        isValid: true,
        isValidCheck: (val) => val.length > 0
      },
      formIsValid: true
    };
  },
  methods: {
    clearValidity(input){
      this[input].isValid = true;
    },
    validateForm(){
      this.formIsValid = true;
      if(!this.firstName.isValidCheck(this.firstName)){
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if(!this.lastName.isValidCheck(this.lastName)){
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if(!this.description.isValidCheck(this.description)){
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if(!this.areas.isValidCheck(this.areas)){
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    handleFormSubmit(){
      this.validateForm();
      if(!this.formIsValid) return;

      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      };
      this.$emit('save-data', formData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin:0.5rem 0;
}

label {
  font-weight:bold;
  display:block;
  margin-bottom:0.5rem;
}

input[type="checkbox"] + label {
  font-weight:normal;
  display:inline;
  margin:0 0 0 0.5rem;
}

input,
textarea {
  display:block;
  width:100%;
  border:1px solid #ccc;
  font:inherit;
}

input:focus,
textarea:focus {
  background-color:#f0e6fd;
  outline:none;
  border-color:#3d008d;
}

input[type="checkbox"] {
  display:inline;
  width:auto;
  border:none;
}

input[type="checkbox"]:focus {
  outline:#3d008d solid 1px;
}

h3 {
  margin:0.5rem 0;
  font-size:1rem;
}

.invalid label {
  color:red;
}

.invalid input,
.invalid textarea {
  border:1px solid red;
}
</style>