<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Editar Patrocinador" />
            <!--FORM-->
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <form @submit.prevent="update">
                        <div class="form-group">
                            <input v-model="patrocinador.name" type="text" class="form-control form-control-lg" id="txtName" placeholder="escreve nome" required />
                        </div>
                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-edit"></i> Actualizar</button>
                        <router-link :to="{name: 'listPatrocinadores'}" tag="button" class="btn btn-outline-danger btn-lg"><i class="fas fa-window-close"></i> Cacelar</router-link>
                    </form>
                </b-col>
                <b-col cols="2"></b-col>
            </b-row>
        </b-container>
    </section>
</template>
<script>
import { EDIT_PATROCINADOR } from "@/store/patrocinadores/patrocinador.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";
import { mapGetters } from "vuex";

export default {
    name: "EditUser",
    components: {
        HeaderPage
    },
    data: () => {
        return {
            patrocinador: {}
        };
    },
    computed: {
        ...mapGetters("patrocinador", ["getPatrocinadoresById", "getMessage"])
    },
    methods: {
        update() {
            this.$store.dispatch(`patrocinador/${EDIT_PATROCINADOR}`, this.$data).then(
                () => {
                    this.$alert(
                        this.getMessage,
                        "Patrocinador atualizado!",
                        "success"
                    );
                    router.push({ name: 'listPatrocinadores' });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        }
    },
    created() {
        this.patrocinador = this.getPatrocinadoresById(this.$route.params.patrocinadorId);
    }
};
</script>