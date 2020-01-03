<template>
  <el-drawer
      title="Asesoramientos"
      :visible.sync="visible"
      :with-header="true"
      :before-close="closeAsesoramiento"
      size="50%">
      <div slot="title">Asesoramiento {{ asesoramiento.id }}</div>
      <div class="panel-content">
        <h2 style="margin-top: 0px;">{{ asesoramiento.title }}</h2>
        <p>{{ asesoramiento.description }}</p>
        <small>{{ asesoramiento.requested_date }}</small>
        <el-divider/>
        <h4>Comentarios ({{ asesoramiento.comments.length }})</h4>
        <el-form :disabled="savingComment">
          <el-form-item>
            <el-input placeholder="Nuevo comentario" type="textarea" rows="4" v-model="newComment.body"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="!newComment.body" @click="crearComentario">Guardar</el-button>
          </el-form-item>
        </el-form>
        <div class="comments-section">
          <ul class="comments-list">
            <li v-for="comment in asesoramiento.comments" :key="comment.id" class="comment-row">
              <div class="comment-id">#{{ comment.id }}</div>
              <div class="comment-body">{{ comment.body }}</div>
              <div class="comment-footer">
                {{ comment.comment_date }} - {{ comment.user_id }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-drawer>
</template>

<script>
import asesoramientosApi from '@/services/api/asesoramientos';

export default {
  name: 'InternacionAsesoramientoDrawer',
  props: {
    item: {
      type: Object,
      required: true
    },
    parentType: {
      type: String,
      required: true
    },
    asesoramiento: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      savingComment: false,
      visible: false,
      newComment: {
        body: ""
      },
    }
  },
  methods: {
    open() {
      this.visible = true;
    },
    crearComentario() {
      this.savingComment = true;
      this.newComment.comment_date = new Date();
      asesoramientosApi.addComentAsesoramiento(this.newComment, this.item.id)
        .then(response => {
          this.asesoramiento.comments.push(response.data.comment);
          this.newComment.body = "";
        })
        .catch(error => {
          console.log("Error ", error);
        })
        .finally(() => {
          this.savingComment = false;
        })
    },
    closeAsesoramiento() {
      this.visible = false;
      this.$emit("close")
    }
  }
}
</script>