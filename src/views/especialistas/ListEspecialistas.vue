<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Gestão de Especialistas" />
            <!--MENU TOPO-->
            <b-row class="mb-4">
                <b-col cols="1"></b-col>
                <b-col>
                    <router-link :to="{name:'addEspecialista'}" tag="button" class="btn btn-outline-success mr-2 mt-2"><i class="fas fa-plus-square"></i> Adicionar</router-link>
                    <router-link :to="{name:'admin'}" tag="button" class="btn btn-outline-info mr-2 mt-2"><i class="fas fa-bars"></i> Menu Principal</router-link>
                </b-col>
                <b-col cols="1"></b-col>
            </b-row>
            <!-- TABELA -->
            <b-row>
                <b-col cols="1"></b-col>
                <b-col>
                    <table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">
                                    Nome
                                    <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                                    <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                                </th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="especialista of especialistas" :key="especialista._id">
                                <td class="pt-4">{{especialista.name}}</td>
                                <td>
                                    <router-link :to="{name:'editEspecialista', params:{especialistaId: especialista._id}}" tag="button" class="btn btn-outline-success mr-2"><i class="fas fa-edit"></i> Editar</router-link>
                                    <button @click="viewEspecialista(especialista._id)" type="button" class="btn btn-outline-success mr-2"><i class="fas fa-search"></i> Ver</button>
                                    <button @click="removeEspecialista(especialista._id)" type="button" class="btn btn-outline-danger mr-2 "><i class="fas fa-trash-alt"></i> Remover</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
                <b-col cols="1"></b-col>
            </b-row>
        </b-container>
    </section>
</template>
<script>
import { FETCH_ESPECIALISTAS, REMOVE_ESPECIALISTA } from "@/store/especialistas/especialista.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import { mapGetters } from "vuex";

export default {
    name: "ManageEspecialistas",
    components: {
        HeaderPage
    },
    data: function() {
        return {

            especialistas: 
            [
                {
                    id:1,
                    name:"Pedro Cossa"

                },{
                    id:2,
                    name:"Adelaide Maria"

                }




            ],
            

            sortType: 1
        };
    },
    computed: {
        ...mapGetters(["getEspecialistaLevelByPoints"]),
        ...mapGetters("especialista", ["getEspecialistas", "getMessage"])
    },
    methods: {
        fetchEspecialistas() {
            this.$store.dispatch(`especialista/${FETCH_ESPECIALISTAS}`).then(
                () => {
//                    this.especialistas = this.getEspecialistas;
                }, err => {
                    this.$alert(`${err.message}`, 'Erro', 'error');
                });
        },
        sort() {
            this.especialistas.sort(this.compareNames)
            this.sortType *= -1
        },
        compareNames(u1, u2) {
            if (u1.name > u2.name) return 1 * this.sortType
            else if (u1.name < u2.name) return -1 * this.sortType
            else return 0
        },

        viewEspecialista(id) {
            const especialista = this.especialistas.find(especialista => especialista._id === id);
            this.$fire({
                title: especialista.name,
                html: this.generateTemplate(especialista),
            });
        },

        generateTemplate(especialista) {
            return `
          <p>
          <b>Nome:</b> ${especialista.name} <br>
          </p>
        `
        },
        removeEspecialista(id) {
            this.$confirm(
                "Se sim, clique em OK",
                "Deseja mesmo remover o utilizador?",
                "warning", { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
            ).then(
                () => {
                    this.$store.dispatch(`especialista/${REMOVE_ESPECIALISTA}`, id).then(() => {
                        this.$alert(
                            this.getMessage,
                            "Utilizador removido!",
                            "success"
                        );
                        this.fetchEspecialistas();
                    });
                },
                () => {
                    this.$alert("Remoção cancelada!", "Informação", "info");
                }
            );
        }
    },
    created() {
        this.data();
    }
};
</script>