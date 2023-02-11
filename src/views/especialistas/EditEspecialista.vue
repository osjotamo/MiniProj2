<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Editar Especialista" />
            <!--FORM-->
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <form @submit.prevent="update">
                        <div class="form-group">
                            <input v-model="especialista.name" type="text" class="form-control form-control-lg" id="txtName" placeholder="escreve nome" required />
                        </div>
                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-edit"></i> Actualizar</button>
                        <router-link :to="{name: 'listEspecialistas'}" tag="button" class="btn btn-outline-danger btn-lg"><i class="fas fa-window-close"></i> Cacelar</router-link>
                    </form>
                </b-col>
                <b-col cols="2"></b-col>
            </b-row>
        </b-container>
    </section>
</template>
<script>
import { EDIT_ESPECIALISTA } from "@/store/especialistas/especialista.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";
import { mapGetters } from "vuex";

export default {
    name: "EditEspecialista",
    components: {
        HeaderPage
    },
    data: () => {
        return {
            especialista: {}
        };
    },
    computed: {
        ...mapGetters("especialista", ["getEspecialistasById", "getMessage"])
    },
    methods: {
        update() {
            this.$store.dispatch(`especialista/${EDIT_ESPECIALISTA}`, this.$data.especialista).then(
                () => {
                    this.$alert(
                        this.getMessage,
                        "Especialista atualizado!",
                        "success"
                    );
                    router.push({ name: 'listEspecialistas' });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        }
    },
    created() {
        this.especialista = this.getEspecialistasById(this.$route.params.especialistaId);
    }
};
</script>