<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Gestão de Patrocinadores" />
            <!--MENU TOPO-->
            <b-row class="mb-4">
                <b-col cols="1"></b-col>
                <b-col>
                    <router-link :to="{name:'addPatrocinador'}" tag="button" class="btn btn-outline-success mr-2 mt-2"><i class="fas fa-plus-square"></i> Adicionar</router-link>
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
                            <tr v-for="patrocinador of patrocinadores" :key="patrocinador.id" >
                                <td class="pt-4">  {{patrocinador.name}} - {{patrocinador.id}}  </td>
                                <td>
                                    <router-link :to="{name:'editPatrocinador', params:{patrocinadorId: patrocinador._id}}" tag="button" class="btn btn-outline-success mr-2"><i class="fas fa-edit"></i> Editar</router-link>
                                    <button @click="viewPatrocinador(patrocinador._id)" type="button" class="btn btn-outline-success mr-2"><i class="fas fa-search"></i> Ver</button>
                                    <button @click="removePatrocinador(patrocinador._id)" type="button" class="btn btn-outline-danger mr-2 "><i class="fas fa-trash-alt"></i> Remover</button>
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
import { FETCH_PATROCINADORES, REMOVE_PATROCINADOR } from "@/store/patrocinadores/patrocinador.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import { mapGetters } from "vuex";

export default {
    name: "ManagePatrocinadores",
    components: {
        HeaderPage
    },
    data: function() {
        return {
            patrocinadores: 
            
            
            
            
            
            [
                {
                    id:1,
                    name:"Vodacom"

                },{
                    id:2,
                    name:"Mcel"

                }




            ]
            
            
            
            ,
            sortType: 1
        };
    },
    computed: {
        ...mapGetters("patrocinador", ["getPatrocinadores", "getMessage"])
    },
    methods: {
        fetchPatrocinadores() {
            this.$store.dispatch(`patrocinador/${FETCH_PATROCINADORES}`).then(
                () => {
                    this.patrocinadores = this.getPatrocinadores;
                }, err => {
                    this.$alert(`${err.message}`, 'Erro', 'error');
                });
        },
        sort() {
            this.patrocinadores.sort(this.compareNames)
            this.sortType *= -1

        },
        compareNames(u1, u2) {
            if (u1.name > u2.name) return 1 * this.sortType
            else if (u1.name < u2.name) return -1 * this.sortType
            else return 0
        },

        viewPatrocinador(id) {
            const patrocinador = this.patrocinadores.find(patrocinador => patrocinador._id === id);
            this.$fire({
                title: patrocinador.name + '- ' + patrocinador.id,
                html: this.generateTemplate(patrocinador),
            });
        },

        generateTemplate(patrocinador) {
            return `
          <p>
          <b>Nome:</b> ${patrocinador.name} <br>
          </p>
        `
        },
        removePatrocinador(id) {
            this.$confirm(
                "Se sim, clique em OK",
                "Deseja mesmo remover o utilizador?",
                "warning", { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
            ).then(
                () => {
                    this.$store.dispatch(`patrocinador/${REMOVE_PATROCINADOR}`, id).then(() => {
                        this.$alert(
                            this.getMessage,
                            "Utilizador removido!",
                            "success"
                        );
                        this.fetchPatrocinadores();
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