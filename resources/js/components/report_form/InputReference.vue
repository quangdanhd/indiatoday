<template>
    <div>
        <label class="w-100 mb-0 ref-bg">
            <input type="text" :name="f_name + '_ref'" v-model="text_search" v-on:keyup="getDataSearch($event)" v-on:keydown="disableSubmit($event)" class="form-control form-control-sm">
            <i v-if="isSpin" class="fas fa-spinner fa-spin"></i>
            <i v-else class="far fa-circle"></i>
            <input type="hidden" :name="f_name" v-model="data_id">
        </label>
        <div class="autocomplete-div">
            <div class="panel-footer autocomplete-box col-xl-12 p-0" @click="autocompleteShow" v-click-outside="autocompleteOutside" v-bind:class="{'d-none': !isActive}">
                <ul class="list-group">
                    <li v-for="(item, key) in data" :key="key + item[ref_key['primary']] + 'atc'" @click="selectData(key)" class="list-group-item p-1 pl-2" :class="{'active': key === indexRow}">
                        {{item[ref_key['field_search']]}} ({{item[ref_key['primary']]}})
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'reference',
            'f_name',
            'i_value',
            'ref_value'
        ],
        data: function () {
            return {
                text_search: this.ref_value,
                data_id: this.i_value,
                data: [],
                ref_key: this.reference[this.f_name],
                isSpin: false,
                maxRow: 0,
                indexRow: -1,
                isActive: true
            }
        },
        methods: {
            getDataSearch(event) {
                let kC = event.keyCode;
                // search
                if (kC > 47 && kC < 112 || [8, 46].includes(kC)) {
                    this.isSpin = true;
                    if (this.text_search.length === 0) {
                        this.data = [];
                        this.isSpin = false;
                        this.data_id = '';
                    }
                    // delay @keyup handler
                    if (this.timer) {
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                    this.timer = setTimeout(() => {
                        if (this.text_search.length > 0) {
                            axios.get('/reference-search', {
                                params: {
                                    table: this.ref_key['table'],
                                    primary: this.ref_key['primary'],
                                    field: this.ref_key['field_search'],
                                    limit: this.ref_key['limit'],
                                    search: this.text_search
                                }
                            }).then(response => {
                                this.data = response.data;
                                this.maxRow = response.data.length;
                                this.indexRow = -1;
                                this.isSpin = false;
                                this.data_id = '';
                                this.isActive = true;
                            });
                        }
                    }, 800);
                }
                // up arrow
                if (kC === 38) {
                    if (this.indexRow === -1) {
                        this.indexRow = this.maxRow;
                    }
                    if (this.indexRow > 0) {
                        this.indexRow--;
                        this.text_search = this.data[this.indexRow][this.ref_key['field_search']] + ' (' + this.data[this.indexRow][this.ref_key['primary']] + ')';
                        this.data_id = this.data[this.indexRow][this.ref_key['primary']];
                    }
                }
                // down arrow
                if (kC === 40) {
                    if (this.indexRow < this.maxRow - 1) {
                        this.indexRow++;
                        this.text_search = this.data[this.indexRow][this.ref_key['field_search']] + ' (' + this.data[this.indexRow][this.ref_key['primary']] + ')';
                        this.data_id = this.data[this.indexRow][this.ref_key['primary']];
                    }
                }
                // enter
                if (kC === 13 && this.indexRow !== -1) {
                    this.isActive = false;
                    this.indexRow = -1;
                    this.maxRow = 0;
                }
            },
            disableSubmit(event) {
                // enter select autocomplete
                if (event.keyCode === 13) {
                    if (this.indexRow !== -1) {
                        event.preventDefault();
                    } else {
                        // submit
                    }
                }
            },
            autocompleteShow() {
                this.isActive = true;
            },
            autocompleteOutside() {
                this.isActive = false;
            },
            selectData(key) {
                this.indexRow = -1;
                this.text_search = this.data[key][this.ref_key['field_search']] + ' (' + this.data[key][this.ref_key['primary']] + ')';
                this.data_id = this.data[key][this.ref_key['primary']];
                this.maxRow = 0;
                let self = this;
                setTimeout(function () {
                    self.isActive = false;
                }, 10);
            }
        }
    }
</script>
