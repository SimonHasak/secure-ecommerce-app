package sk.tuke.fei.icube.mapper;

import org.mapstruct.Mapper;
import sk.tuke.fei.icube.dto.CategoryDTO;
import sk.tuke.fei.icube.model.Category;

import java.util.Set;

/**
 * @author Šimon Hašák
 */
@Mapper
public interface CategoryMapper {

    Set<Category> toCategories(Set<CategoryDTO> categoryDTOs);

    Category toCategory(CategoryDTO categoryDTO);

    Set<CategoryDTO> toCategoryDTOs(Set<Category> categories);

}
