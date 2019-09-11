<template>
	<div>
	 <el-dialog
    	title="Nuevo Contacto"
    	:visible.sync="openForm"
    	:show-close="false"
    	:close-on-press-escape="false"
    	:close-on-click-modal="false">
          <el-form :model="contacto" label-width="120px">
              <el-form-item label="Nombre">
                  <el-input v-model="contacto.firstname"></el-input>
              </el-form-item>
              <el-form-item label="Apellido">
                  <el-input v-model="contacto.lastname"></el-input>
              </el-form-item>
              <el-form-item label="Telefono">
                  <el-input v-model="contacto.phone"></el-input>
              </el-form-item>
              <el-form-item label="DNI">
                  <el-input v-model="contacto.document_number"></el-input>
              </el-form-item>
             <el-form-item label="Relacion">
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
import contactApi from '@/services/api/contact'
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
			contactApi.createContact(this.pacienteId, this.contacto).then(response => {
          this.contact = response.data.contact;
          this.$emit('finish', response.data.contact);
        })
		}
	}
};


</script>