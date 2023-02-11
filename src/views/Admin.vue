<template>
    <section class="page-section">
        <b-container fluid>
            <HeaderPage title="Gestão do Animalec" />
            <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <b-card-group card>
                        <AdminOptionBox routeName="listUsers" iconName="users" title="Utilizadores" />
                        <AdminOptionBox routeName="listAnimals" iconName="dog" title="Animais" />
                        <AdminOptionBox routeName="listEspecialistas" iconName="cat" title="Especialistas" />
                        <AdminOptionBox routeName="listPatrocinadores" iconName="dog" title="Patrocinadores" />
                    </b-card-group>
                    <b-card-group card class="mt-3">
                        <AdminOptionBox routeName="listQuizzes" iconName="file-alt" title="Quizzes" />
                        <AdminOptionBox routeName="listQuestions" iconName="question-circle" title="Questões" />
                    </b-card-group>
                </b-col>
                <b-col cols="4"></b-col>
            </b-row>
        </b-container>
    </section>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
    components: {
        HeaderPage,
        AdminOptionBox
    }
};
</script>