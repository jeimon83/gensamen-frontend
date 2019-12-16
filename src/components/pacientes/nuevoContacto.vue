<template>
	<div>
	 <el-dialog
    	title="Nuevo Contacto"
    	:visible.sync="openForm"
    	:show-close="false"
    	:close-on-press-escape="false"
    	:close-on-click-modal="false">
          <el-form :model="contacto" label-width="120px" ref="contactoForm" :rules="rules">
              <el-form-item label="Nombre" prop="firstname">
                  <el-input v-model="contacto.firstname"></el-input>
              </el-form-item>
              <el-form-item label="Apellido" prop="lastname">
                  <el-input v-model="contacto.lastname"></el-input>
              </el-form-item>
              <el-form-item label="Telefono" prop="phone">
                  <el-input v-model="contacto.phone"></el-input>
              </el-form-item>
              <el-form-item label="DNI" prop="document_number">
                  <el-input v-model="contacto.document_number"></el-input>
              </el-form-item>
             <el-form-item label="Relacion" prop="relationship">
                  <el-select v-model="contacto.relationship" clearable filterable style="width: 100%;">
                  	<el-option value="padre">Padre</el-option>
                  	<el-option value="madre">Madre</el-option>
                  	<el-option value="hijo">Hijo/a</el-option>
                  	<el-option value="hermano">Hermano/a</el-option>
                  	<el-option value="tutor">Tutor/a</el-option>
                  	<el-option value="conyuge">Conyuge</el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeModal()">Cancelar</el-button>
            <el-button type="primary" @click="saveContact">Guardar</el-button>
          </span>
      </el-dialog>
	</div>
</template>

<script>
import contactsApi from '@/services/api/contacts'
export default {
	props: {
		pacienteId: {
			type: Number,
			required: true
		},
		openForm: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      }
    }
	},
	data() {
		return {
			showNuevoContacto: false,
				contacto: {
					firstname: "",
					lastname: "",
					phone: "",
					document_number: "",
					relationship: ""
			},
      rules: {
              firstname: [
                { required: true, message: 'Nombre no valido', trigger: 'blur' },
              ],
              lastname: [
                { required: true, message: 'Apellido no valido', trigger: 'blur'}
              ],
              phone: [
                { required: true, message: 'numero no valido', trigger: 'blur' }
              ],
              document_number: [
                { required: true, message: 'DNI no valido', trigger: 'blur' }
              ],
              relationship: [
                { required: true, message: 'Relacion no valida', trigger: 'change' }
              ]
            }
		}
	},
	methods: {
		closeModal() {
			this.contacto = {
				firstname: "",
				lastname: "",
				phone: "",
				document_number: "",
				relationship: ""
			};
      this.$emit('close');
		},
		saveContact() {
			contactsApi.createContact(this.pacienteId, this.contacto).then(response => {
          this.contact = response.data.contact;
          this.$emit('finish', response.data.contact);
        })
		}
	}
};


</script>