var data = {
    'Spring 2018': [
        {
            title: "Garden Mystery",
            studentName: "Judith Brennan",
            summary: "",
            slug: "garden-mystery"
        },
        {
            title: "Awful Game",
            studentName: "Robert Brown",
            summary: "",
            slug: "awful-game"
        },
        {
            title: "PatThicc",
            studentName: "Daniel Jung",
            summary: "",
            slug: "patthicc"
        },
        {
            title: "Ravioli",
            studentName: "Stephen Kamali",
            summary: "",
            slug: "ravioli"
        },
        {
            title: "Yeji",
            studentName: "Shannon Ke",
            summary: "",
            slug: "yeji"
        },
        {
            title: "Frogger",
            studentName: "Tarun Maddali",
            summary: "",
            slug: "frogger"
        },
    ],
    'Fall 2017': [
        {
            title: "Come Find Me",
            studentName: "Jonathan Gaul",
            summary: "",
            slug: "come-find-me"
        }
    ],
    'TA Games': [
        {
            title: "Ted",
            studentName: "Austin Adams",
            summary: "",
            slug: "ted"
        },
        /*{
            title: "cnake",
            studentName: "Cem Gokmen",
            summary: "",
            slug: "cnake"
        },*/
        {
            title: "Bubble Bobble",
            studentName: "Madison Grams",
            summary: "",
            slug: "bubble-bobble"
        },
        {
            title: "Super Toad-ally Mario",
            studentName: "Joshua Viszlai",
            summary: "",
            slug: "super-toad-ally-mario"
        },
        {
            title: "Pokemon Grind Version",
            studentName: "Benjamin Yarmowich",
            summary: "",
            slug: "pokemon-grind"
        },
    ]
};


var PortfolioItem = React.createClass({
    render: function () {
        return (
            <div className="col-sm-6 col-md-4">
                <div className="thumbnail">
                    <img src={"./images/" + this.props.slug + ".png"}/>
                    <div className="caption">
                        <h3>{this.props.title}<br/>
                            <small>{this.props.studentName}</small>
                        </h3>
                        <p>{this.props.summary}</p>
                        <p><a href={"./launcher.html#" + this.props.slug} className="btn btn-success" role="button">Play</a> <a href={"./binaries/" + this.props.slug + ".gba"} className="btn btn-primary" role="button">Download</a></p>
                    </div>
                </div>
            </div>
        );
    }
});

var PortfolioGroup = React.createClass({
    getInitialState: function () {
        return ({active: true});
    },
    render: function () {
        if (this.state.active) {
            var items = this.props.data.map(function (item, i) {
                return (
                    [<PortfolioItem key={i} title={item.title} studentName={item.studentName}
                                    summary={item.summary} slug={item.slug}></PortfolioItem>]
                );
            }, this);
            return (
                <div className="row">
                    <h2>{this.props.title}</h2>
                    {items}
                </div>
            );
        } else {
            return null;
        }
    }
})

var PortfolioFilters = React.createClass({
    updateFilter: function (name, event) {
        var active = event.target.checked;
        this.props.onChange(name, active);
    },
    render: function () {
        var boxes = this.props.groups.map(function (group, i) {
            return (
                <label key={i} className="checkbox-inline"><input type="checkbox" ref={group} name={group}
                                                                  defaultChecked={true}
                                                                  onChange={this.updateFilter.bind(null, group)}></input>{group}
                </label>
            );
        }, this);
        return (
            <div className="text-center">
                <h4>Filters: </h4>
                {boxes}
            </div>
        );
    }
})

var Portfolio = React.createClass({
    handleUpdate: function (group, active) {
        if (this.props.data[group] != null) {
            this.refs[group].setState({active: active})
        }
    },
    render: function () {
        var groupNames = [];
        var groups = [];
        for (var group in this.props.data) {
            if (this.props.data.hasOwnProperty(group)) {
                groupNames.push(group);
                groups.push(<PortfolioGroup key={group} ref={group} title={group}
                                            data={this.props.data[group]}></PortfolioGroup>)
            }
        }
        return (
            <div className="container"><PortfolioFilters groups={groupNames}
                                                         onChange={this.handleUpdate}></PortfolioFilters>
                <div>
                    {groups}
                </div>
            </div>
        );
    }
});

React.render(
    <Portfolio data={data}/>, document.getElementById("content")
);
