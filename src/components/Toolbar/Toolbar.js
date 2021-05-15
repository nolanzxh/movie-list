import './Toolbar.css';
import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { toggleFilterCatg } from '../../actions';

const getAllCategories = (movies) => {
    let categories = new Map()
    movies.forEach(element => {
        categories.set(element.category, false)
    })
    return categories
}

export class Toolbar extends React.Component {

    handleChange = (e) => {
        this.props.toggleFilterCatg(e.target.name)
    }

    render() {
        const { categories, categoriesSelected } = this.props
        const categoriesArr = []
        for (let key of categories.keys()) {
            categoriesArr.push({ key, value: categoriesSelected.indexOf(key) === -1 ? false : true })
        }

        return (
            <div className="category_filter" >
                <span id='category'>CATEGORY :&nbsp;&nbsp;</span>
                {
                    categoriesArr.map((el) =>
                        <FormControlLabel
                            key={el.key}
                            control={<Checkbox checked={el.value} onChange={this.handleChange} name={el.key} />}
                            label={el.key}
                        />
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    movies: state.movies,
    categories: getAllCategories(state.movies),
    categoriesSelected: state.categoriesSelected
})

export default connect(
    mapStateToProps,
    { toggleFilterCatg }
)(Toolbar);
