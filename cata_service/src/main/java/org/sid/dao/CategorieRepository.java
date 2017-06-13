package org.sid.dao;

import org.sid.entities.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//remarque : pour les catégories, on va utiliser l'annotation  RepositoryRestResource
@RepositoryRestResource
public interface CategorieRepository extends JpaRepository<Categorie, Long> {

}
