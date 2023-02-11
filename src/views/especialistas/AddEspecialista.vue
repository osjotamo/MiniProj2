<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Adicionar Especialista" />
            <!--FORM-->
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <form @submit.prevent="add">
                        <div class="form-group">
                            <input v-model="name" type="text" class="form-control form-control-lg" id="txtName" placeholder="escreve nome" required />
                        </div>
                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-plus-square"></i> Adicionar
                        </button>
                        <router-link :to="{name: 'listEspecialistas'}" tag="button" class="btn btn-outline-danger btn-lg">
                            <i class="fas fa-window-close"></i> Cancelar
                        </router-link>
                    </form>
                </b-col>
                <b-col cols="2"></b-col>
            </b-row>
        </b-container>
    </section>
</template>
<script>
import { ADD_ESPECIALISTA } from "@/store/especialistas/especialista.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";
import { mapGetters } from "vuex";

export default {
    name: "AddEspecialista",
    components: {
        HeaderPage
    },
    data: () => {
        return {
            name: ""
        };
    },
    computed: {
        ...mapGetters("especialista", ["getMessage"]),
    },
    methods: {
        add() {

            this.$store.dispatch(`especialista/${ADD_ESPECIALISTA}`, this.$data).then(
                () => {
                    this.$alert(
                        this.getMessage,
                        "Especialista adicionado!",
                        "success"
                    );
                    router.push({ name: 'listEspecialistas' });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        }
    }
};
</script>