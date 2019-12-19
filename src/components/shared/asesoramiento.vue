<template>
	<el-drawer
		:visible.sync="showPanel"
    :width-header="true"
  	:before-close="confirmClose"
    size="50%">
    <div slot="title">Asesoramientos</div>
    <div class="panel-content">
      <el-form :model="asesoramiento">
      	<el-form-item>
          <el-select v-model="asesoramiento.type" style="width: 100%;" prop="type" placeholder="seleccionar tipo">
            <el-option label="a" value="a"></el-option>
            <el-option label="b" value="b"></el-option>
        	</el-select>
      	</el-form-item>
      	<el-form-item>
      		<el-input
  				  type="textarea"
  				  :rows="2"
  				  placeholder="comentarios"
  				  v-model="asesoramiento.comentario">
  				</el-input>
      	</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="guardarAsesoramiento">Guardar</el-button>
        </el-form-item>
  		</el-form>
    </div>
  </el-drawer>
</template>

<script>
import asesoramientosApi from '@/services/api/asesoramientos';

	export default {
     props: {
        itemType: {
          type: String,
          required: true
        },
        item: {
            type: Object,
            required: true
        }
    },
		data() {
      return {
        showPanel: false,
  			asesoramiento: {
  				type: "",
  				comentario: ""
  			},
    		rules: {
          type: [
            { required: true, message: 'tipo no valido', trigger: 'change' },
          ],
        }
      };
		},

		methods: {
      openPanel() {
        this.showPanel = true;
      },
      confirmClose() {
        this.showPanel = false;
      },
      handleClick(tab) {
      console.log(tab);
      if (this.activeName == "second") {
        this.getAsesoramiento()
      } else {
        this.reporte = {
          type: "",
          expiration_date: new Date()
        }
      }
    },
      getAsesoramiento() {
      asesoramientosApi.getAsesoramiento(this.item.id).then(response => {
        this.asesoramiento = response.data.asesoramiento
      })
    },
      guardarAsesoramiento() {
      	this.loading = true;
        this.asesoramiento.type = new Date();
        this.asesoramiento.internment_id = this.item.id;
        asesoramientosApi.createAsesoramientos(this.item.id, this.asesoramiento)
      .then(response => {
        this.asesoramiento.push(response.data.asesoramiento);
        this.$message({
          message: 'El asesoramiento se creo con exito',
          type: 'success'
        });
      })
      .catch(error => {
        this.$message({
          message: 'Hubo un error al crear El asesoramiento',
          type: 'error'
        });
      })
      .finally(() => {
        this.activeName = "second";
      });
    }
    }
	};
</script>

<style>
  .panel-content {
    padding: 20px;
  }
  .el-drawer__header {
    font-size: 1.25em !important;
    margin-bottom: 15px !important;
  }
</style>