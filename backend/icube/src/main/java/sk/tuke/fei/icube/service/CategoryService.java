package sk.tuke.fei.icube.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Category;
import sk.tuke.fei.icube.repository.CategoryRepository;

/**
 * @author Šimon Hašák
 */
@Service
public class CategoryService extends CrudService<Category> {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    protected PagingAndSortingRepository<Category, Long> getRepository() {
        return categoryRepository;
    }
}